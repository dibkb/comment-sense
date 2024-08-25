import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { type YouTubeVideoResponse } from "@/types/nodeapi";
import { useChanneInfo } from "@/hooks/useChannelInfo";

// Component to render channel information
interface ChannelInfo {
  apiResponse: YouTubeVideoResponse;
}
const ChannelInfo = ({ apiResponse }: ChannelInfo) => {
  const { loading, channelResponse } = useChanneInfo(
    apiResponse.items[0].snippet.channelId
  );
  if (loading) return;
  return (
    <Link
      className="flex items-center gap-2 w-min px-2 py-1 rounded-xl hover:bg-stone-100"
      href={"#"}
      target="_blank"
    >
      <Avatar>
        <AvatarImage
          src={channelResponse?.items[0].snippet.thumbnails.default.url}
          alt={channelResponse?.items[0].snippet.title}
        />
        <AvatarFallback>
          {channelResponse?.items[0].snippet.title}
        </AvatarFallback>
      </Avatar>
      <h2 className="font-medium whitespace-nowrap">
        {channelResponse?.items[0].snippet.title}
        <p className="text-xs text-stone-600">
          {channelResponse?.items[0].statistics.subscriberCount}
        </p>
      </h2>
    </Link>
  );
};
export default ChannelInfo;
