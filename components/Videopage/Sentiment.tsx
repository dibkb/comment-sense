import React from "react";
import { Tooltip, TooltipProvider } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { type SentimentObj } from "@/types/fastapi";
import { cn } from "@/lib/utils";
import { colorMap } from "@/utils/colors";
import { formatScore } from "@/utils";

const Sentiment = ({ label, score }: SentimentObj) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "px-4 py-[1px] text-xs text-stone-100 font-semibold rounded-md capitalize",
              `bg-[${colorMap[label]}]`
            )}
          >
            {label}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Predicted with a confidence of {formatScore(score)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Sentiment;
