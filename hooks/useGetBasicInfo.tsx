import { getVideoInfo } from "@/apicall/nodeapi";
import { toast } from "@/components/ui/use-toast";
import { VideoInfo } from "@/types/nodeapi";
import { isYouTubeId } from "@/utils/regx";
import { ToastAction } from "@radix-ui/react-toast";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useGetBasicInfo = () => {
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<VideoInfo>();
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const ytid = searchParams.get("ytid");
  useEffect(() => {
    if (ytid && isYouTubeId(ytid)) {
      setLoading(true);
      getVideoInfo(ytid)
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
  }, [ytid]);
  return {
    loading,
    apiResponse,
    error,
  };
};
