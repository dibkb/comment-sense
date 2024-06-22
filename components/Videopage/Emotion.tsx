import { EmotionObj } from "@/types/fastapi";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { formatScore } from "@/utils";
import emotionEmojiMap from "@/utils/emojimap";
import { cn } from "@/lib/utils";
import { emotionBgColor } from "@/utils/colors";

const Emotion = ({ label, score }: EmotionObj) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "px-4 py-[1px] text-xs text-stone-800 font-semibold rounded-md capitalize flex gap-2 items-center"
            )}
            style={{
              backgroundColor: emotionBgColor[label],
            }}
          >
            <span>{emotionEmojiMap[label]}</span>
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

export default Emotion;
