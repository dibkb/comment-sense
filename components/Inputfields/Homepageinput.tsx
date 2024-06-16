"use client";
import { heading } from "@/fonts";
import { cn } from "@/lib/utils";
import React from "react";

const Homepageinput = () => {
  return (
    <>
      <input
        type="text"
        className="flex-1 outline-none px-4 rounded-full bg-transparent font-medium"
        placeholder="https://www.youtube.com/watch?v=pwN8u6HFH8U"
      />
      <button
        className={cn(
          "hover:bg-stone-700 hover:text-white rounded-2xl px-4",
          heading.className
        )}
      >
        See Demo
      </button>
    </>
  );
};

export default Homepageinput;
