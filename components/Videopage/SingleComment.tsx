import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sentimentType, type Comment } from "@/types/fastapi";
import Language from "../svg/Language";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import Sentiment from "./Sentiment";
import { cn } from "@/lib/utils";
interface Commentprops {
  comment: Comment;
}
const SingleComment = ({ comment }: Commentprops) => {
  const [showTrans, setShowTrans] = useState(false);
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-lg px-4 py-2 border border-stone-200"
        // getBgColor(comment.sentiment.label)
      )}
    >
      {/* photo and name and time */}
      <div className="flex items-center justify-between">
        <Link
          href={`https://www.youtube.com/channel/${comment.channel}`}
          target="_blank"
          className="flex items-center gap-2 group"
        >
          <Avatar className="size-6">
            <AvatarImage src={comment.photo} alt={comment.author} />
            <AvatarFallback>{comment.author.substring(1, 2)}</AvatarFallback>
          </Avatar>
          <p className="text-xs text-stone-500 font-medium group-hover:text-stone-800 group-hover:underline">
            {comment.author}
          </p>
        </Link>
        <div className="text-[8px] text-stone-400 flex items-center gap-1">
          {comment.time}
        </div>
      </div>
      {/* text */}
      <p className="text-sm">{comment.text}</p>
      {/* transalate */}
      {comment.translated ? (
        <>
          <span onClick={() => setShowTrans((t) => !t)}>
            <p className="cursor-pointer text-stone-600 text-[10px] flex items-center gap-1 px-2 py-[2px] rounded-md hover:bg-stone-100 w-min select-none whitespace-nowrap">
              <Language className="size-3" />
              {showTrans ? "Don't translate" : "Translate"}
            </p>
          </span>
          {showTrans && (
            <p className="text-xs ml-4">&ldquo;{comment.translated}&ldquo;</p>
          )}
        </>
      ) : (
        ""
      )}
      {/* Chat and Like count */}
      <div className="flex gap-2 whitespace-nowrap w-min ml-auto text-[10px] text-stone-400 ">
        <p className="flex items-center gap-[2px]">
          <HeartFilledIcon className="size-3" />
          {comment.votes}
        </p>
        {/* <p className="flex items-center gap-1">
          <ChatBubbleIcon className="size-3" />
          {comment.replies}
        </p> */}
      </div>
      <div>
        <Sentiment
          label={comment.sentiment.label}
          score={comment.sentiment.score}
        />
      </div>
    </div>
  );
};

export default SingleComment;

// Helper function to get background color based on sentiment label
function getBgColor(label: sentimentType): string {
  switch (label) {
    case "negative":
      return "bg-red-50";
    case "neutral":
      return "bg-amber-50";
    case "positive":
      return "bg-green-50";
  }
}
