import { CommentProvider, useCommentContext } from "@/context/CommentContext";
import useFetchComments from "@/hooks/useFetchComments";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { TabsContent, TabsTrigger, Tabs, TabsList } from "../ui/tabs";
import { cn } from "@/lib/utils";
import { heading } from "@/fonts";
import SentimentTab from "./Tabs/SentimentTab";
import { PaginationNext, PaginationPrevious } from "../ui/pagination";
import CommentSkeleton from "../SkeletonLoaders/CommentSkeleton";
import EmotionTab from "./Tabs/EmotionTab";

// Create a QueryClient instance to be used in the QueryClientProvider
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Define the props for the CommentSectionWrapper component
interface CommentSectionWrapperProps {
  // ytid: string;
}

// Define the CommentSectionWrapper component
const CommentSectionWrapper = () => {
  // Wrap the CommentProvider with the QueryClientProvider
  return (
    <QueryClientProvider client={queryClient}>
      <CommentProvider>
        <CommentSection />
      </CommentProvider>
    </QueryClientProvider>
  );
};

// Export the CommentSectionWrapper component
export default CommentSectionWrapper;

// Define the props for the CommentSection component
interface CommentSectionProps {
  // ytid: string;
}

// Define the CommentSection component
const CommentSection = () => {
  // Fetch the comments using the useFetchComments hook
  useFetchComments();

  // Get the comment data, range, setRange function, and loading state from the CommentContext
  const { range, data, setRange, loading } = useCommentContext();
  const previousClickHandler = useCallback(
    () =>
      setRange((prevRange) => {
        return {
          start: prevRange.start - 50,
          stop: prevRange.stop - 50,
        };
      }),
    [setRange]
  );
  const nextClickHandler = useCallback(
    () =>
      setRange((prevRange) => {
        return {
          start: prevRange.start + 50,
          stop: prevRange.stop + 50,
        };
      }),
    [setRange]
  );
  // If the data is still loading, return the CommentSkeleton component
  if (loading) return <CommentSkeleton />;

  // Return the comment section UI
  return (
    <>
      <div className="flex flex-col gap-6 mt-2 pb-8">
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
          <TabsContent value="emotion">
            <EmotionTab />
          </TabsContent>
        </Tabs>
        <div className="flex items-center gap-4 mx-auto">
          <button disabled={range.start === 0} onClick={previousClickHandler}>
            <PaginationPrevious
              className={range.start === 0 ? "opacity-15" : ""}
            />
          </button>
          <button disabled={data.length !== 50} onClick={nextClickHandler}>
            <PaginationNext
              className={data.length !== 50 ? "opacity-15" : ""}
            />
          </button>
        </div>
      </div>
    </>
  );
};
