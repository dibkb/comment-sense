import React from "react";
import { BarchartSentiment } from "./BarchartSentiment";
import { BarchartEmotion } from "./BarchartEmotion";

const Visualization = () => {
  return (
    <div className="flex flex-col gap-4">
      <BarchartSentiment />
      <BarchartEmotion />
    </div>
  );
};

export default Visualization;
