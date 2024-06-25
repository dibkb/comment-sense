import React from "react";
import { Skeleton } from "../ui/skeleton";

const MainContentSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 my-4 mt-6">
      <Skeleton className="h-16 rounded-2xl" />
      <Skeleton className="relative pt-[56.25%] rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
    </div>
  );
};

export default MainContentSkeleton;
