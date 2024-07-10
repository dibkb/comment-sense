import { fastApiInstance } from "@/axios";
import { isYouTubeId } from "@/utils/regx";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const usePrepareChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const ytid = searchParams.get("ytid");
  useEffect(() => {
    if (ytid && isYouTubeId(ytid)) {
      setLoading(true);
      fastApiInstance
        .post("/prepare", {
          video_id: ytid,
        })
        .then((res) => {
          setLoading(false);
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
    error,
  };
};
