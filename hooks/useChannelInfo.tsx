"use client";

import { getChannelInfo } from "@/apicall/nodeapi";
import { toast } from "@/components/ui/use-toast";
import { YouTubeChannelResponse } from "@/types/nodeapi";
import { useEffect, useState } from "react";

export const useChanneInfo = (channelId: string) => {
  const [loading, setLoading] = useState(false);
  const [channelResponse, setChannelResponse] =
    useState<YouTubeChannelResponse>();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (channelId) {
      setLoading(true);
      getChannelInfo(channelId)
        .then((res) => {
          setChannelResponse(res);
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
  }, [channelId]);
  return {
    loading,
    channelResponse,
    error,
  };
};
