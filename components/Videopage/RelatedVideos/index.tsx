import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SearchResults } from "@/types/nodeapi";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface RealtedVideos {
  apiResponse: SearchResults;
}
const RealtedVideos = ({ apiResponse }: RealtedVideos) => {
  const videos = apiResponse.videos.map((video) => (
    <Link key={video.id} href={`/video?ytid=${video.id}`} className="group">
      <Card className="group-hover:bg-stone-100">
        <AspectRatio ratio={16 / 9} className="bg-muted relative">
          <Image
            src={video.thumbnails[0].url}
            alt={video.title}
            fill
            className="rounded-t-md object-cover"
          />
          <Badge className="absolute bottom-0 right-0" variant={"default"}>
            {video.duration.text}
          </Badge>
        </AspectRatio>
        <div className="p-2 flex flex-col gap-1">
          <h1 className="text-xs line-clamp-2">{video.title}</h1>
          <h2 className="text-xs line-clamp-1 text-stone-500">
            {video.channel.name}
          </h2>
          <span className="flex justify-between overflow-clip text-[10px] text-stone-500">
            <p>{video.views.pretty}</p>
            <p>{video.published.pretty}</p>
          </span>
        </div>
      </Card>
    </Link>
  ));
  return <div className="flex flex-col gap-2">{videos}</div>;
};

export default RealtedVideos;
