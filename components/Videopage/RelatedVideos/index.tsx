import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { SearchResults } from "@/types/nodeapi";
import Image from "next/image";
import React from "react";
interface RealtedVideos {
  apiResponse: SearchResults;
}
const RealtedVideos = ({ apiResponse }: RealtedVideos) => {
  const videos = apiResponse.videos.map((video) => (
    <Card key={video.id} className="h-36">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <Image
          src={video.thumbnails[0].url}
          alt={video.title}
          fill
          className="rounded-md object-cover"
        />
      </AspectRatio>
      <h1>{video.title}</h1>
    </Card>
  ));
  return <div className="flex flex-col gap-2">{videos}</div>;
};

export default RealtedVideos;
