import { VideoInfo } from "@/types/nodeapi";
import React from "react";
import Videourlinput from "../Inputfields/Videoinputfield";
import ReactPlayer from "react-player";
import VideoHeader from "./VideoHeader";
import ChannelInfo from "./Channelinfo";
import VideoDetails from "./VideoDetails";
import Description from "./Description";

// Component to render video and related information
interface VideoContentProps {
  apiResponse: VideoInfo;
}
const VideoContent = ({ apiResponse }: VideoContentProps) => (
  <>
    <div className="flex justify-center">
      <Videourlinput buttonText="Search" />
    </div>
    <div className="w-full mt-4 mx-auto shadow-xl rounded-2xl">
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
      <VideoHeader apiResponse={apiResponse} />
      <ChannelInfo apiResponse={apiResponse} />
      <VideoDetails apiResponse={apiResponse} />
      <Description text={apiResponse?.shortDescription} />
    </div>
  </>
);

export default VideoContent;
