import { CommentProvider, useCommentContext } from "@/context/CommentContext";
import useFetchComments from "@/hooks/useFetchComments";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { TabsContent, TabsTrigger, Tabs, TabsList } from "../ui/tabs";
import { cn } from "@/lib/utils";
import { heading } from "@/fonts";
import SentimentTab from "./Tabs/SentimentTab";

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
  const { range } = useCommentContext();
  return (
    <div className="flex flex-col gap-6 mt-2">
      <p className={cn("text-center", heading.className)}>
        You are viewing page {range.stop / 50}
      </p>
      <Tabs defaultValue="sentiment" className="w-full">
        <TabsList className="w-full flex">
          <TabsTrigger value="sentiment" className="flex-1">
            Sentiment Detection
          </TabsTrigger>
          <TabsTrigger value="emotion" className="flex-1">
            Emotion Detection
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sentiment">
          <SentimentTab />
        </TabsContent>
        <TabsContent value="emotion">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};
