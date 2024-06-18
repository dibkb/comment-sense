// Import necessary dependencies and utilities
import React, { Fragment, memo, useState } from "react";
import { processPart, processText } from "@/utils"; // Utility functions
import { PinBottomIcon, PinTopIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

// Define the interface for DescriptionProps and RenderPartProps
interface DescriptionProps {
  text: string;
}
interface RenderPartProps {
  parts: string[];
  urls: string[] | null;
}
// Component to render parts of the text, including URLs and timestamps
const RenderParts = ({ parts, urls }: RenderPartProps) => {
  return (
    <>
      {parts.map((part, index) => {
        const { timeParts, times } = processPart(part); // Process each part for timestamps
        return (
          <Fragment key={index}>
            {timeParts.map((timePart, timeIndex) => (
              <Fragment key={timeIndex}>
                {timePart}
                {times && times[timeIndex] && (
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-800 hover:underline"
                  >
                    {times[timeIndex]}
                  </a>
                )}
              </Fragment>
            ))}
            {urls && urls[index] && (
              <a
                href={urls[index]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:underline"
              >
                {urls[index]}
              </a>
            )}
          </Fragment>
        );
      })}
    </>
  );
};

// Main component to render the description text
const Description = ({ text }: DescriptionProps) => {
  // Split the text into blocks separated by double newlines
  const doubleLines = text.split("\n\n");
  const [showLess, setShowLess] = useState(true);
  return (
    <div className="border border-stone-300 bg-stone-300 p-4 rounded-[8px]">
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
          <p key={blockIndex} className="mb-4">
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
          </p>
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
    </div>
  );
};

// Return memoized component
export default memo(Description);
