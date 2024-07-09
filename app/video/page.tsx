"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MainContentSkeleton from "@/components/SkeletonLoaders/MainContentSkeleton";
import CommentSectionWrapper from "@/components/Videopage/CommentSection";
import { useGetBasicInfo } from "@/hooks/useGetBasicInfo";
import { isYouTubeId } from "@/utils/regx";
import VideoContent from "@/components/Videopage/VideoContent";
import { Card } from "@/components/ui/card";
import { useRelatedVideos } from "@/hooks/useRelatedVideos";
import RealtedVideos from "@/components/Videopage/RelatedVideos";
import Chatcomponent from "@/components/Videopage/Chat/Chatcomponent";

export const dynamic = "force-dynamic";

export default function Video() {
  const searchParams = useSearchParams();
  const ytid = searchParams.get("ytid");
  const { loading, apiResponse } = useGetBasicInfo();
  const { loading: loadingRelated, apiResponse: relatedVideos } =
    useRelatedVideos(
      apiResponse?.title.slice(0, 12) +
        " " +
        apiResponse?.channel.name.slice(0, 12) || ""
    );
  const [isClient, setIsClient] = useState(false);

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
  return (
    <>
      {/* left */}
      <div className="w-9/12 flex pl-4 sm:pl-8 ">
        <div className="w-36 mt-4 overflow-clip">{relatedContent}</div>
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
      {/* right */}
      <div
        className="w-3/12 mt-4 fixed z-50 right-0 top-12 pr-4 sm:pr-8"
        style={{ height: "calc(100% - 5rem)" }}
      >
        <Chatcomponent />
      </div>
    </>
  );
}
