import { Tooltip, TooltipProvider } from "@radix-ui/react-tooltip";
import React from "react";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { type SentimentObj } from "@/types/fastapi";
import { cn } from "@/lib/utils";

const Sentiment = ({ label, score }: SentimentObj) => {
  let bgColor = "";
  switch (label) {
    case "negative":
      bgColor = "bg-[#FE5E57]";
    case "neutral":
      bgColor = "bg-[#FDBB35]";

    case "positive":
      bgColor = "bg-[#00CD4C]";
  }

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
          <p>
            Predicted with a confidence of {Math.round(score * 100 * 100) / 100}
            %
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Sentiment;
