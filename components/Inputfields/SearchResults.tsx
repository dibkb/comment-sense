import { type SearchResults } from "@/types/nodeapi";
import React from "react";
import { Card } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Avatar } from "@radix-ui/react-avatar";
import Play from "../svg/Play";
interface SearchResultsInterface {
  searchVideos: SearchResults;
}
const SearchResults = ({ searchVideos }: SearchResultsInterface) => {
  return (
    <div className="flex flex-col">
      {searchVideos.videos.map((video) => (
        <Link
          key={video.id}
          href={`/video?ytid=${video.id}`}
          className="rounded-md hover:bg-stone-100 p-2 flex gap-3"
        >
          <div className="flex w-20">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src={video.thumbnails[0].url}
                alt={video.title}
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
          <main className="flex-1 text-xs flex flex-col gap-1">
            <h1 className="line-clamp-1">{video.title}</h1>
            <p className="flex items-center gap-1">
              <Play className={"size-3 text-stone-400"} />
              <h2 className="line-clamp-1">{video.channel.name}</h2>
            </p>
          </main>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
