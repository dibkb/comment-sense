import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type Comment } from "@/types/fastapi";
import Language from "../svg/Language";
interface Commentprops {
  comment: Comment;
}
const SingleComment = ({ comment }: Commentprops) => {
  const [showTrans, setShowTrans] = useState(comment.translated ? true : 0);
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
      <span>
        <p className="cursor-pointer text-stone-600 text-xs flex items-center gap-1 px-2 py-1 hover:bg-stone-200 w-min border">
          <Language className="size-3" />
          Translate
        </p>
      </span>
    </div>
  );
};

export default SingleComment;
