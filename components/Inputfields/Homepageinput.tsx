"use client";

import { isYouTubeLink } from "@/utils/regx";
import React, { MouseEventHandler, useState } from "react";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
import { getYouTubeVideoId } from "@/utils";
import Urlinput from "./Urlinput";

const Homepageinput = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [url, setUrl] = useState<string>("");
  const seeDemoClickHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const id = getYouTubeVideoId(url);
    if (isYouTubeLink(url) && id) {
      router.push(`/video?ytid=${id}`);
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
    <Urlinput
      state={url}
      setState={setUrl}
      butttonClickHandler={seeDemoClickHandler}
    >
      See Demo
    </Urlinput>
  );
};

export default Homepageinput;
