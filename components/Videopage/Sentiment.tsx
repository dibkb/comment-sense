import { Tooltip, TooltipProvider } from "@radix-ui/react-tooltip";
import React from "react";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";

const Sentiment = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="px-4 py-[1px] border text-xs rounded-md">
            Hover
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Sentiment;
