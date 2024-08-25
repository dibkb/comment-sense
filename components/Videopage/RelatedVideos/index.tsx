/* eslint-disable @next/next/no-img-element */
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { YouTubeSearchListResponse } from "@/types/nodeapi";
import Link from "next/link";
import React from "react";
interface RealtedVideos {
  apiResponse: YouTubeSearchListResponse;
}
const RealtedVideos = ({ apiResponse }: RealtedVideos) => {
  const videos = apiResponse.items.map((video) => (
    <Link
      key={video.id.videoId}
      href={`/video?ytid=${video.id.videoId}`}
      className="group"
    >
      <Card className="group-hover:bg-stone-100">
        <img
          src={video.snippet.thumbnails?.medium.url}
          alt={video.snippet.title}
          className="rounded-t-md object-cover"
        />
        {/* <Badge className="absolute bottom-0 right-0" variant={"default"}>
            {video.snippet.}
          </Badge> */}
        {/* </AspectRatio> */}
        <div className="p-2 flex flex-col gap-1">
          <h1 className="text-xs line-clamp-2">{video.snippet.title}</h1>
          <h2 className="text-xs line-clamp-1 text-stone-500">
            {video.snippet.channelTitle}
          </h2>
          {/* <span className="flex justify-between overflow-clip text-[10px] text-stone-500">
            <p>{video.views.pretty}</p>
            <p>{video.published.pretty}</p>
          </span> */}
        </div>
      </Card>
    </Link>
  ));
  return <div className="flex flex-col gap-2">{videos}</div>;
};

export default RealtedVideos;
