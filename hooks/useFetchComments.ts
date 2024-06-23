// useFetchData.ts
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Comment } from "@/types/fastapi";
import { fastApiInstance } from "@/axios";
import { useCommentContext } from "@/context/CommentContext";
import { useSearchParams } from "next/navigation";

interface getVideoInfoProps {
  ytid: string;
  start: number;
  end: number;
  sort: 0 | 1;
}

const useFetchComments = (): void => {
  const searchParams = useSearchParams();
  const id = searchParams.get("ytid");
  const { range, setLoading, setError, setData, sort } = useCommentContext();
  const fetchComments = async (): Promise<Comment[]> => {
    const res = await fastApiInstance.get(
      `video/?ytid=${id}&start=${range.start}&end=${range.stop}&sort=${sort}`
    );
    return res.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["pageData", id, range.start],
    queryFn: id && id.length ? fetchComments : () => Promise.resolve([]),
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
