"use client";

import { getRelatedVideo } from "@/apicall/nodeapi";
import { SearchResults, VideoInfo } from "@/types/nodeapi";
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
  const [apiResponse, setApiResponse] = useState<SearchResults>();
  const [error, setError] = useState<boolean>(false);
  const debouncedTitle = useDebounce(title, 300); //
  useEffect(() => {
    if (debouncedTitle.length) {
      setLoading(true);
      getRelatedVideo(debouncedTitle)
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
