import { useCommentContext } from "@/context/CommentContext";
import { calculateSentiment } from "@/utils";
import React, { useMemo } from "react";
import SingleComment from "../SingleComment";
import SentimentBar from "../Sentimentbar";

const SentimentTab = () => {
  const { data } = useCommentContext();
  const sentimentCounts = useMemo(() => calculateSentiment(data), [data]);
  const commentsRender = data.map((c) => {
    return <SingleComment key={c.cid} comment={c} />;
  });
  return (
    <div className="flex flex-col gap-4 mt-4">
      <SentimentBar {...sentimentCounts} />
      <main className="flex flex-col gap-6">{commentsRender}</main>
    </div>
  );
};

export default SentimentTab;
