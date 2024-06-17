import { getVideoInfo } from "@/apicall/nodeapi";
import { toast } from "@/components/ui/use-toast";
import { VideoInfo } from "@/types/nodeapi";
import { ToastAction } from "@radix-ui/react-toast";
import { useEffect, useState } from "react";

export const useGetBasicInfo = (id: string) => {
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<VideoInfo>();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (id) {
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
    }
  }, [id]);
  return {
    loading,
    apiResponse,
    error,
  };
};
