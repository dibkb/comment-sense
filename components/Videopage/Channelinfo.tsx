import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { type VideoInfo } from "@/types/nodeapi";

// Component to render channel information
interface ChannelInfo {
  apiResponse: VideoInfo;
}
const ChannelInfo = ({ apiResponse }: ChannelInfo) => (
  <Link
    className="flex items-center gap-2 w-min px-2 py-1 rounded-xl hover:bg-stone-300"
    href={apiResponse?.channel?.url || "#"}
    target="_blank"
  >
    <Avatar>
      <AvatarImage
        src={apiResponse?.channel?.icons?.at(0)?.url}
        alt={apiResponse.channel.name}
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
);
export default ChannelInfo;
