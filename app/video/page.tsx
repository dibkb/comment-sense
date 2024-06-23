"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MainContentSkeleton from "@/components/SkeletonLoaders/MainContentSkeleton";
import CommentSectionWrapper from "@/components/Videopage/CommentSection";
import { useGetBasicInfo } from "@/hooks/useGetBasicInfo";
import { isYouTubeId } from "@/utils/regx";
import VideoContent from "@/components/Videopage/VideoContent";

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
    <Suspense>
      <main className="px-8 flex flex-col gap-4 max-w-[900px]">
        {mainContent}
        <CommentSectionWrapper />
      </main>
    </Suspense>
  );
}
