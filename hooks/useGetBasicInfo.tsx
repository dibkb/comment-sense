import { getVideoInfo } from "@/apicall/nodeapi";
import { toast } from "@/components/ui/use-toast";
import { VideoInfo } from "@/types/nodeapi";
import { isYouTubeId } from "@/utils/regx";
import { ToastAction } from "@radix-ui/react-toast";
import { useEffect, useState } from "react";

export const useGetBasicInfo = () => {
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<VideoInfo>();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("ytid");
    if (id && isYouTubeId(id)) {
      setLoading(true);
      getVideoInfo(id)
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
  }, []);
  return {
    loading,
    apiResponse,
    error,
  };
};
