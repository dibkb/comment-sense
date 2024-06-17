"use client";
import { heading } from "@/fonts";
import { cn } from "@/lib/utils";
import { isYouTubeLink } from "@/utils/regx";
import React, { MouseEventHandler, useState } from "react";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

const Homepageinput = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState<string>("");
  const seeDemoClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (isYouTubeLink(url)) {
    } else {
      toast({
        variant: "default",
        title: "Uh oh! Something went wrong. 😢",
        description: "The url you entered is not a valid youtube url",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };
  return (
    <>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 outline-none px-4 rounded-full bg-transparent font-medium"
        placeholder="https://www.youtube.com/watch?v=pwN8u6HFH8U"
      />
      <button
        onClick={seeDemoClickHandler}
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
