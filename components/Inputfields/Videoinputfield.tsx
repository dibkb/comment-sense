"use client";

import { isYouTubeLink } from "@/utils/regx";
import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
import { getYouTubeVideoId } from "@/utils";
import Urlinput from "../Inputfields/Urlinput";
import { useRelatedVideos } from "@/hooks/useRelatedVideos";
import SearchResults from "./SearchResults";
import { Card } from "../ui/card";

interface Videourlinputprops {
  buttonText: string;
}
const Videourlinput = ({ buttonText }: Videourlinputprops) => {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState<string>("");
  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const id = getYouTubeVideoId(search);
    if (isYouTubeLink(search) && id) {
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
  const { loading, apiResponse } = useRelatedVideos(search);
  const mainContent =
    loading || !apiResponse ? "" : <SearchResults searchVideos={apiResponse} />;

  const [isOpen, setIsOpen] = useState(false);
  const componentRef = useRef<HTMLSpanElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (apiResponse) {
      setIsOpen(true);
    }
  }, [apiResponse]);
  return (
    <span
      className="flex border rounded-xl sm:rounded-2xl p-1 w-full hover:border-stone-400 group relative"
      ref={componentRef}
      onClick={() => setIsOpen(true)}
    >
      <Urlinput
        state={search}
        setState={setSearch}
        submitHandler={submitHandler}
      >
        {buttonText}
      </Urlinput>
      {isOpen && (
        <Card className="absolute w-full border bg-white h-72 z-50 top-16 left-0 overflow-scroll">
          {mainContent}
        </Card>
      )}
    </span>
  );
};

export default Videourlinput;
