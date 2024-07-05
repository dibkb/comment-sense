"use client";

import { getYouTubeVideoId } from "@/utils";
import { isYouTubeLink } from "@/utils/regx";
import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
import Urlinput from "../Inputfields/Urlinput";
import { useRelatedVideos } from "@/hooks/useRelatedVideos";
import SearchResults from "./SearchResults";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface VideoUrlInputProps {
  buttonText: string;
}

const VideoUrlInput = ({ buttonText }: VideoUrlInputProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [search, setSearch] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLSpanElement>(null);

  const { loading, apiResponse } = useRelatedVideos(search);

  // Handle form submission
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const videoId = getYouTubeVideoId(search);
    if (isYouTubeLink(search) && videoId) {
      router.push(`/video?ytid=${videoId}`);
    } else {
      router.push(`/search?query=${search}`);
    }
  };

  // Handle click outside the dropdown to close it
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  // Add and clean up event listener for detecting clicks outside the dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle dropdown visibility based on API response and input URL
  useEffect(() => {
    if ((loading || apiResponse) && search.length) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [search, loading, apiResponse]);

  // Render search results
  const renderSearchResults = () => {
    if (loading || !apiResponse) {
      return (
        <div className="flex flex-col gap-3 p-2">
          {new Array(4).fill(0).map((a) => (
            <Skeleton key={a} className="border w-full h-16" />
          ))}
        </div>
      );
    }
    return <SearchResults searchVideos={apiResponse} />;
  };

  return (
    <span
      className="flex border rounded-xl sm:rounded-2xl p-1 w-full hover:border-stone-400 group relative"
      ref={dropdownRef}
      onClick={() => setIsDropdownOpen(true)}
    >
      <Urlinput
        state={search}
        setState={setSearch}
        submitHandler={handleSubmit}
      >
        {buttonText}
      </Urlinput>
      {isDropdownOpen && (
        <Card className="absolute w-full border bg-white h-72 z-50 top-16 left-0 overflow-scroll">
          {renderSearchResults()}
        </Card>
      )}
    </span>
  );
};

export default VideoUrlInput;
