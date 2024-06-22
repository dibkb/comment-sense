// useFetchData.ts
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Comment } from "@/types/fastapi";
import { fastApiInstance } from "@/axios";
import { useCommentContext } from "@/context/CommentContext";

interface getVideoInfoProps {
  ytid: string;
  start: number;
  end: number;
  sort: 0 | 1;
}

const useFetchComments = (ytid: string): void => {
  const { range, setRange, setLoading, setError, setData, sort } =
    useCommentContext();
  const { data, error, isLoading } = useQuery({
    queryKey: ["pageData", range.start],
    queryFn: async (): Promise<Comment[]> => {
      const res = await fastApiInstance.get(
        `video/?ytid=${ytid}&start=${range.start}&end=${range.stop}&sort=${sort}`
      );
      return res.data;
    },
  });
  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data, setData]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setError(error ? (error as Error) : null);
  }, [error, setError]);
};

export default useFetchComments;
