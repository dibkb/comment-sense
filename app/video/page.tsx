"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import MainContentSkeleton from "@/components/SkeletonLoaders/MainContentSkeleton";
import CommentSectionWrapper from "@/components/Videopage/CommentSection";
import { useGetBasicInfo } from "@/hooks/useGetBasicInfo";
import { isYouTubeId } from "@/utils/regx";
import VideoContent from "@/components/Videopage/VideoContent";
import { useRelatedVideos } from "@/hooks/useRelatedVideos";
import RealtedVideos from "@/components/Videopage/RelatedVideos";
import Chatcomponent from "@/components/Videopage/Chat/Chatcomponent";
import { usePrepareChat } from "@/hooks/usePrepareChat";
import Chatloading from "@/components/Videopage/Chat/Chatloading";
import useGetWidth from "@/hooks/useGetWidth";
import Logo from "@/components/svg/Logo";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Modal from "@/components/Modal/Model";

export const dynamic = "force-dynamic";

export default function Video() {
  const searchParams = useSearchParams();
  const ytid = searchParams.get("ytid");
  const { loading, apiResponse } = useGetBasicInfo();
  const { loading: chatLoading, error: chatError } = usePrepareChat();
  const { loading: loadingRelated, apiResponse: relatedVideos } =
    useRelatedVideos(
      apiResponse?.title.slice(0, 12) +
        " " +
        apiResponse?.channel.name.slice(0, 12) || ""
    );
  const { width } = useGetWidth();
  const [showChat, setShowChat] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const dialogueRef = useRef<HTMLDivElement>(null);

  // Ensure this runs only on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return null if not client-side
  if (!isClient) return null;

  // Handle invalid YouTube ID
  if (typeof ytid !== "string" || !isYouTubeId(ytid)) {
    return null; // TODO: Handle invalid YouTube video ID
  }

  // Define the main content based on the loading state
  const mainContent =
    !apiResponse || loading ? (
      <MainContentSkeleton />
    ) : (
      <VideoContent apiResponse={apiResponse} />
    );

  const relatedContent =
    !relatedVideos || loadingRelated ? (
      ""
    ) : (
      <RealtedVideos apiResponse={relatedVideos} />
    );
  const bigScreen = width && width >= 1200;
  const chatPage = () => {
    return (
      <Modal isOpen={showChat} onClose={() => setShowChat(false)}>
        {chatLoading ? (
          <Chatloading />
        ) : (
          <Chatcomponent fullScreen={true} parentRef={dialogueRef} />
        )}
      </Modal>
    );
  };

  return (
    <>
      {/* left */}
      <div className={`${bigScreen && "w-9/12  "} flex md:pl-4`}>
        <div className="hidden md:flex w-36 mt-4 overflow-clip">
          {relatedContent}
        </div>
        {/* middle */}
        <div className="flex-1 overflow-y-auto p-4">
          <Suspense>
            <main className="flex-1 flex flex-col gap-4">
              {mainContent}
              <CommentSectionWrapper />
            </main>
          </Suspense>
        </div>
      </div>
      {/* right chat-bar*/}
      {bigScreen && (
        <div
          className="w-3/12 mt-4 fixed z-50 right-0 top-12 pr-4 sm:pr-8"
          style={{ height: "calc(100% - 5rem)" }}
        >
          {chatLoading ? <Chatloading /> : <Chatcomponent />}
        </div>
      )}
      {/* small screen specific */}
      <button
        onClick={() => {
          setShowChat((p) => !p);
        }}
        className="fixed z-[1000] bottom-36 right-6 bg-white rounded-full p-1 shadow-xl cursor-pointer hover:bg-stone-50 hover:shadow-2xl"
      >
        <Logo className="size-9" />
      </button>
      {!bigScreen && showChat && chatPage()}
    </>
  );
}
