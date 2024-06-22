import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Comment } from "@/types/fastapi";
import Language from "../svg/Language";
interface Commentprops {
  comment: Comment;
}
const SingleComment = ({ comment }: Commentprops) => {
  const [showTrans, setShowTrans] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      {/* photo and name */}
      <Link
        href={`https://www.youtube.com/channel/${comment.channel}`}
        target="_blank"
        className="flex items-center gap-2 group"
      >
        <Avatar className="size-6">
          <AvatarImage src={comment.photo} alt={comment.author} />
          <AvatarFallback>{comment.author.substring(1, 2)}</AvatarFallback>
        </Avatar>
        <p className="text-xs text-stone-500 font-medium group-hover:text-stone-800">
          {comment.author}
        </p>
      </Link>
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
            <p className="text-xs">&ldquo;{comment.translated}&ldquo;</p>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default SingleComment;
