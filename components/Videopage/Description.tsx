// Import necessary dependencies and utilities
import React, { Fragment, memo } from "react";
import { processPart, processText } from "@/utils"; // Utility functions

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

  return (
    <div className="text-sm">
      {doubleLines.map((block, blockIndex) => (
        <p key={blockIndex} className="mb-4">
          {block.split("\n").map((line, lineIndex) => {
            const { parts, urls } = processText(line); // Process each line for URLs
            return (
              <p key={lineIndex} className="flex flex-wrap items-center gap-1">
                <RenderParts parts={parts} urls={urls} />{" "}
                {/* Render parts and URLs */}
              </p>
            );
          })}
        </p>
      ))}
    </div>
  );
};

// Return memoized component
export default memo(Description);
