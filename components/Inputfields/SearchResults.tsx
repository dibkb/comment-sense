/* eslint-disable @next/next/no-img-element */
import { type YouTubeSearchListResponse } from "@/types/nodeapi";
import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
// import Image from "next/image";
import Link from "next/link";
import Play from "../svg/Play";
import ArrowUpRight from "../svg/ArrowUpRight";
interface SearchResultsInterface {
  searchVideos: YouTubeSearchListResponse;
  size?: "s" | "m" | "l";
}
const SearchResults = ({
  searchVideos,
  size = "s",
}: SearchResultsInterface) => {
  return (
    <div className="flex flex-col">
      {searchVideos.items.map((video) => (
        <Link
          key={video.id.videoId}
          href={`/video?ytid=${video.id.videoId}`}
          className="rounded-md hover:bg-stone-100 p-2 flex gap-3"
        >
          <div
            className={`flex ${
              size === "l" && "h-[58px] w-[100px] md:h-[112px] md:w-[192px]"
            }  ${size === "s" && "w-20"}`}
          >
            <img
              src={video.snippet.thumbnails?.medium.url}
              alt={video.snippet.title}
              className="rounded-md object-cover"
            />
          </div>
          <main
            className={`flex-1 ${size === "s" && "text-xs"} 
                      ${size === "l" && "text-base"}
            flex flex-col gap-1`}
          >
            <h1 className="line-clamp-1 font-medium text-sm sm:text-base">
              {video.snippet.title}
            </h1>
            <p className="flex items-center gap-1">
              <Play className={"size-3 text-stone-500"} />
              <h2 className="line-clamp-1">{video.snippet.channelTitle}</h2>
            </p>
            <span
              className={`${size === "s" && "text-[10px]"}
                          ${size === "l" && "text-xs"}
               text-stone-500 line-clamp-2`}
            >
              {video.snippet.description}
              {/* <p className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-stone-500" />
                {video.views.prettyLong}
              </p>
              <p className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-stone-500" />
                {video.duration.pretty}
              </p>
              <p className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-stone-500" />
                {video.published.pretty}
              </p> */}
            </span>
          </main>
          <ArrowUpRight className="size-3 text-stone-400" />
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
