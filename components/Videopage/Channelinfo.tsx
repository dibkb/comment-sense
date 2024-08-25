import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { type YouTubeVideoResponse } from "@/types/nodeapi";
import { useChanneInfo } from "@/hooks/useChannelInfo";
import { formatNumber } from "@/utils";

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
    <div className="flex items-center gap-2 w-min px-2 py-1 rounded-xl">
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
        {channelResponse?.items[0].statistics.subscriberCount ? (
          <p className="text-xs text-stone-600">
            {formatNumber(
              +channelResponse?.items[0].statistics.subscriberCount
            )}
          </p>
        ) : (
          ""
        )}
      </h2>
    </div>
  );
};
export default ChannelInfo;
