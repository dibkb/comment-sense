import React from "react";
import { Tooltip, TooltipProvider } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { type SentimentObj } from "@/types/fastapi";
import { cn } from "@/lib/utils";

// Helper function to get background color based on sentiment label
const getBgColor = (label: string): string => {
  switch (label) {
    case "negative":
      return "bg-[#FE5E57]";
    case "neutral":
      return "bg-[#FDBB35]";
    case "positive":
      return "bg-[#00CD4C]";
    default:
      return "";
  }
};

// Helper function to format the score
const formatScore = (score: number): string => {
  return `${(score * 100).toFixed(2)}%`;
};

const Sentiment = ({ label, score }: SentimentObj) => {
  const bgColor = getBgColor(label);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "px-4 py-[1px] text-xs text-stone-100 font-semibold rounded-md capitalize",
              bgColor
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
