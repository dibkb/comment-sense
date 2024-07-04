"use client";

import { getRelatedVideo } from "@/apicall/nodeapi";
import { toast } from "@/components/ui/use-toast";
import { SearchResults, VideoInfo } from "@/types/nodeapi";
import { ToastAction } from "@radix-ui/react-toast";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useRelatedVideos = (title: string) => {
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<SearchResults>();
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    if (title.length) {
      setLoading(true);
      getRelatedVideo(title)
        .then((res) => {
          setApiResponse(res);
        })
        .catch((error) => {
          const typedError = error as Error;
          setError(typedError.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // TODO : invalid videoid or missing videoid
    }
  }, [title]);
  return {
    loading,
    apiResponse,
    error,
  };
};
