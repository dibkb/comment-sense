import React from "react";
import { Skeleton } from "../ui/skeleton";

const CommentSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {[...Array(9)].map((ele, i) => (
        <Skeleton key={i} className="h-24 rounded-lg" />
      ))}
    </div>
  );
};

export default CommentSkeleton;
