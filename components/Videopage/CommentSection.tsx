"use client";
import React, { useState } from "react";
import Language from "../svg/Language";
import { body, heading } from "@/fonts";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

const languages = [
  "English",
  "हिंदी",
  "தமிழ்",
  "తెలుగు",
  "ਪੰਜਾਬੀ",
  "മലയാളം",
  "ಕನ್ನಡ",
  "অসমীয়া",
];
const CommentSection = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const buttonClickHandler = () => {
    setShowModal((p) => !p);
  };
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  return (
    <div className="py-10">
      <div
        className={cn(
          "border border-stone-300 py-1 px-4 hover:bg-stone-300 w-min whitespace-nowrap rounded-[6px] flex gap-2 items-center cursor-pointer text-sm relative mx-auto select-none",
          heading.className
        )}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={buttonClickHandler}
      >
        {selectedLang}
        <Language className="text-stone-600" />
        {showModal ? <ChevronUpIcon /> : <ChevronDownIcon />}
        {showTooltip && (
          <span
            className={cn(
              "absolute top-[-40px] left-0 text-[10px] bg-stone-700 text-stone-100 p-1 px-2 rounded-[4px] animate-out select-none",
              body.className
            )}
          >
            You are only viewing all the comments typed in {selectedLang}
          </span>
        )}
        {showModal && (
          <span className="flex flex-col absolute top-8 border w-full left-0 rounded-[4px] border-stone-300">
            {languages.map((lang) => (
              <p
                key={lang}
                className="px-4 py-1 hover:bg-stone-300 flex justify-between items-center"
                onClick={() => setSelectedLang(lang)}
              >
                {lang}
                {selectedLang === lang && (
                  <pre className="size-2 bg-green-600 rounded-full" />
                )}
              </p>
            ))}
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
