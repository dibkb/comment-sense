"use client";
import Videourlinput from "@/components/Inputfields/Videoinputfield";
import Description from "@/components/Videopage/Description";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { heading } from "@/fonts";
import { useGetBasicInfo } from "@/hooks/useGetBasicInfo";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/utils";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";

export const dynamic = "force-dynamic";

export default function Video() {
  const { loading, apiResponse } = useGetBasicInfo();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  // TODO : skeleton loader
  if (loading) return "Loading...";
  return (
    <Suspense>
      <main className="container flex flex-col gap-4 max-w-[900px]">
        <span className="flex justify-center">
          <Videourlinput buttonText="Go" />
        </span>
        <div className="w-full mx-auto shadow-xl rounded-2xl">
          <div className="relative pt-[56.25%] rounded-2xl">
            <ReactPlayer
              className="absolute top-0 left-0 react-player"
              url={apiResponse?.url}
              controls={true}
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="border-b border-stone-300 pb-2">
            <h1 className="text-xl font-medium ">{apiResponse?.title}</h1>
            <span className="mt-1 text-sm text-stone-600 flex justify-between items-center">
              <h2 className="">{apiResponse?.views.text}</h2>
              <span className="text-xs font-medium flex gap-4">
                <h3 className="flex items-center gap-1">
                  <span className="size-1 bg-stone-900 rounded-full" />
                  {formatDuration(apiResponse?.duration.lengthSec)}
                </h3>
                <h3 className="flex items-center gap-1">
                  <span className="size-1 bg-stone-900 rounded-full" />
                  {apiResponse?.published.pretty}
                </h3>
              </span>
            </span>
          </span>
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
          <span
            className={cn(
              "mt-2 flex items-center justify-between text-sm text-stone-700",
              heading.className
            )}
          >
            <h1>{apiResponse?.category}</h1>
            {apiResponse?.isFamilySafe && <h1>Family Friendly</h1>}
          </span>
          <Description text={apiResponse?.shortDescription || ""} />
        </div>
      </main>
    </Suspense>
  );
}
