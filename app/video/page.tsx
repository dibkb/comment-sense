"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MainContentSkeleton from "@/components/SkeletonLoaders/MainContentSkeleton";
import CommentSectionWrapper from "@/components/Videopage/CommentSection";
import { useGetBasicInfo } from "@/hooks/useGetBasicInfo";
import { isYouTubeId } from "@/utils/regx";
import VideoContent from "@/components/Videopage/VideoContent";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default function Video() {
  const searchParams = useSearchParams();
  const ytid = searchParams.get("ytid");
  const { loading, apiResponse } = useGetBasicInfo();
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

  return (
    <main className="flex px-4 sm:px-8">
      {/* right */}
      <div className="w-full max-w-[1080px] mx-auto">
        <Suspense>
          <main className="flex flex-col gap-4">
            {mainContent}
            <CommentSectionWrapper />
          </main>
        </Suspense>
      </div>
      {/* left */}
      {/* <div className="w-1/3 fixed right-0 h-[100vh] z-50 pr-8 pt-[24px]">
        <Card className="h-full"></Card>
      </div> */}
    </main>
  );
}
