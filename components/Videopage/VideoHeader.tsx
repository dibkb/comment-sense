import { VideoInfo } from "@/types/nodeapi";
import { formatDuration } from "@/utils";

// Component to render video header
interface VideoHeaderProps {
  apiResponse: VideoInfo;
}
const VideoHeader = ({ apiResponse }: VideoHeaderProps) => {
  return (
    <span className="border-b pb-2">
      <h1 className="text-xl font-medium">{apiResponse?.title}</h1>
      <span className="mt-1 text-sm text-stone-600 flex justify-between items-center">
        <h2>{apiResponse?.views.text}</h2>
        <span className="text-xs font-medium flex gap-4">
          <h3 className="flex items-center gap-1">
            <span className="size-1 bg-stone-900 rounded-full" />
            {formatDuration(apiResponse?.duration.lengthSec)}
          </h3>
          <h3 className="flex items-center gap-1">
            <span className="size-1 bg-stone-900 rounded-full" />
            {apiResponse?.published.pretty}
          </h3>
        </span>
      </span>
    </span>
  );
};
export default VideoHeader;
