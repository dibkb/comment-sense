import { type SearchResults } from "@/types/nodeapi";
import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import Play from "../svg/Play";
import ArrowUpRight from "../svg/ArrowUpRight";
interface SearchResultsInterface {
  searchVideos: SearchResults;
  size?: "s" | "m" | "l";
}
const SearchResults = ({
  searchVideos,
  size = "s",
}: SearchResultsInterface) => {
  return (
    <div className="flex flex-col">
      {searchVideos.videos.map((video) => (
        <Link
          key={video.id}
          href={`/video?ytid=${video.id}`}
          className="rounded-md hover:bg-stone-100 p-2 flex gap-3"
        >
          <div
            className={`flex ${size === "l" && "w-48"}  ${
              size === "s" && "w-20"
            }`}
          >
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src={video.thumbnails[0].url}
                alt={video.title}
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
          <main
            className={`flex-1 ${size === "s" && "text-xs"} 
                      ${size === "l" && "text-base"}
            flex flex-col gap-1`}
          >
            <h1 className="line-clamp-1 font-medium">{video.title}</h1>
            <p className="flex items-center gap-1">
              <Play className={"size-3 text-stone-500"} />
              <h2 className="line-clamp-1">{video.channel.name}</h2>
            </p>
            <span
              className={`${size === "s" && "text-[10px]"}
                          ${size === "l" && "text-sm"}
               text-stone-500 flex gap-4`}
            >
              <p className="flex items-center gap-2">
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
              </p>
            </span>
          </main>
          <ArrowUpRight className="size-3 text-stone-400" />
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
