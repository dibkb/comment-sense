"use client";

import { isYouTubeLink } from "@/utils/regx";
import React, { FormEventHandler, useState } from "react";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
import { getYouTubeVideoId } from "@/utils";
import Urlinput from "../Inputfields/Urlinput";

interface Videourlinputprops {
  buttonText: string;
}
const Videourlinput = ({ buttonText }: Videourlinputprops) => {
  const router = useRouter();
  const { toast } = useToast();
  const [url, setUrl] = useState<string>("");
  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const id = getYouTubeVideoId(url);
    if (isYouTubeLink(url) && id) {
      router.push(`/video?ytid=${id}`);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong. 😢",
        description: "The url you entered is not a valid youtube url",
        action: (
          <ToastAction
            altText="Try again"
            className="border border-red-400 px-2 py-1 rounded-[4px]"
          >
            Try again
          </ToastAction>
        ),
      });
    }
  };
  return (
    <span className="flex mt-6 border rounded-2xl p-1 w-full max-w-[900px] h-12 hover:border-stone-400 group">
      <Urlinput state={url} setState={setUrl} submitHandler={submitHandler}>
        {buttonText}
      </Urlinput>
    </span>
  );
};

export default Videourlinput;
