"use client";
import React, { useEffect, useState } from "react";
import Tick from "../svg/Tick";

interface Featuresprops {
  children: React.ReactNode;
}
const Featureslayout = ({ children }: Featuresprops) => {
  return (
    <h2 className="text-xs flex items-center gap-1">
      <Tick className="text-stone-700 size-4" />
      {children}
    </h2>
  );
};
const Indianlanguage = () => {
  const items = ["Indian", "भारतीय", "இந்தியன்", "ਭਾਰਤੀ", "ভাৰতীয়"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [items.length]);
  return (
    <Featureslayout>
      Support for
      <p className="w-12 flex justify-center">{items[currentIndex]}</p>{" "}
      Languages
    </Featureslayout>
  );
};
const Features = () => {
  return (
    <>
      <Featureslayout>100% free</Featureslayout>
      <Featureslayout>Using state-of-the-art LLM</Featureslayout>
      <Indianlanguage />
    </>
  );
};
export default Features;
