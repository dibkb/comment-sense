"use client";
import Videourlinput from "@/components/Inputfields/Videoinputfield";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetBasicInfo } from "@/hooks/useGetBasicInfo";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";

export default function Video() {
  const { loading, apiResponse } = useGetBasicInfo();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  return (
    <main className="container flex flex-col gap-4">
      <span className="flex justify-center">
        <Videourlinput buttonText="Go" />
      </span>
      <div className="max-w-[900px] w-full mx-auto shadow-xl rounded-2xl">
        <div className="relative pt-[56.25%] rounded-2xl">
          <ReactPlayer
            className="absolute top-0 left-0 react-player"
            url={apiResponse?.url}
            controls={true}
            width="100%"
            height="100%"
            style={{
              borderRadius: "40px",
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-medium border-b border-stone-300 pb-2">
          {apiResponse?.title}
        </h1>
        <Link
          className="flex items-center gap-2 w-min px-2 py-1 
          rounded-xl hover:bg-stone-300"
          href={apiResponse?.channel?.url || "#"}
          target="_blank"
        >
          <Avatar>
            <AvatarImage
              src={apiResponse?.channel?.icons?.at(0)?.url}
              alt="@shadcn"
            />
            <AvatarFallback>{apiResponse?.channel.name}</AvatarFallback>
          </Avatar>
          <h2 className="font-medium whitespace-nowrap">
            {apiResponse?.channel.name}
            <p className="text-xs text-stone-600">
              {apiResponse?.channel.subscribers.pretty}
            </p>
          </h2>
        </Link>
      </div>
    </main>
  );
}
