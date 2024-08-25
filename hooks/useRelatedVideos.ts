"use client";

import { getRelatedVideo } from "@/apicall/nodeapi";
import { YouTubeSearchListResponse } from "@/types/nodeapi";
import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
export const useRelatedVideos = (title: string) => {
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<YouTubeSearchListResponse>();
  const [error, setError] = useState<boolean>(false);
  const debouncedTitle = useDebounce(title, 300); //
  useEffect(() => {
    if (debouncedTitle.trim() === "") return;
    if (debouncedTitle.length) {
      setLoading(true);
      getRelatedVideo(debouncedTitle, 12)
        .then((res) => {
          setApiResponse(res);
        })
        .catch((error) => {
          const typedError = error as Error;
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // TODO : invalid videoid or missing videoid
    }
  }, [debouncedTitle]);
  return {
    loading,
    apiResponse,
    error,
  };
};
