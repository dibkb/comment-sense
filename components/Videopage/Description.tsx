// Import necessary dependencies and utilities
import React, { Fragment, memo, useState } from "react";
import { processPart, processText } from "@/utils"; // Utility functions
import { PinBottomIcon, PinTopIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import RenderParts from "./Rendertextparts";
import { Card } from "../ui/card";

// Define the interface for DescriptionProps and RenderPartProps
interface DescriptionProps {
  text: string;
}

// Main component to render the description text
const Description = ({ text }: DescriptionProps) => {
  // Split the text into blocks separated by double newlines
  const doubleLines = text.split("\n\n");
  const [showLess, setShowLess] = useState(true);
  return (
    <Card className="bg-stone-100 p-4">
      <div
        className={cn(
          "text-sm overflow-hidden",
          showLess && "h-24 hover:cursor-pointer"
        )}
        onClick={() => {
          setShowLess((prev) => {
            return prev ? !prev : prev;
          });
        }}
      >
        {doubleLines.map((block, blockIndex) => (
          <span key={blockIndex} className="mb-4">
            {block.split("\n").map((line, lineIndex) => {
              const { parts, urls } = processText(line); // Process each line for URLs
              return (
                <p
                  key={lineIndex}
                  className="flex flex-wrap items-center gap-1"
                >
                  <RenderParts parts={parts} urls={urls} />{" "}
                  {/* Render parts and URLs */}
                </p>
              );
            })}
          </span>
        ))}
      </div>
      <button
        onClick={() => setShowLess((prev) => !prev)}
        className="text-stone-800 font-semibold mx-auto text-xs hover:underline w-full flex items-center justify-center gap-1 group"
      >
        {showLess ? (
          <>
            <PinBottomIcon className="animate-bounce group-hover:animate-none size-3" />
            Show more
          </>
        ) : (
          <>
            <PinTopIcon className="animate-bounce group-hover:animate-none size-3" />
            Show less
          </>
        )}
      </button>
    </Card>
  );
};

// Return memoized component
export default memo(Description);
