import { CommentProvider, useCommentContext } from "@/context/CommentContext";
import useFetchComments from "@/hooks/useFetchComments";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
interface CommentSectionprops {
  ytid: string;
}
const CommentSectionWrapper = ({ ytid }: CommentSectionprops) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CommentProvider>
        <CommentSecton ytid={ytid} />
      </CommentProvider>
    </QueryClientProvider>
  );
};
export default CommentSectionWrapper;

const CommentSecton = ({ ytid }: CommentSectionprops) => {
  useFetchComments(ytid);
  const { data } = useCommentContext();
  return <div>{JSON.stringify(data)}</div>;
};
