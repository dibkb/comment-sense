import { processText } from "@/utils";
import React from "react";
import RenderParts from "./Rendertextparts";
interface Commenttext {
  text: string;
}
const Commenttext = ({ text }: Commenttext) => {
  // Split the text into blocks separated by double newlines
  const doubleLines = text.split("\n\n");
  return (
    <div className="text-sm">
      {doubleLines.map((block, blockIndex) => (
        <span key={blockIndex} className="mb-4">
          {block.split("\n").map((line, lineIndex) => {
            const { parts, urls } = processText(line); // Process each line for URLs
            return (
              <p key={lineIndex} className="flex flex-wrap items-center gap-1">
                <RenderParts parts={parts} urls={urls} />{" "}
                {/* Render parts and URLs */}
              </p>
            );
          })}
        </span>
      ))}
    </div>
  );
};

export default Commenttext;
