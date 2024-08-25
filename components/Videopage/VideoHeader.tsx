import { YouTubeVideoResponse } from "@/types/nodeapi";
import { convertToSeconds, formatDuration, formatPrettyDate } from "@/utils";

// Component to render video header
interface VideoHeaderProps {
  apiResponse: YouTubeVideoResponse;
}
const VideoHeader = ({ apiResponse }: VideoHeaderProps) => {
  return (
    <span className="border-b pb-2">
      <h1 className="text-xl font-medium">
        {apiResponse?.items[0].snippet.title}
      </h1>
      <span className="mt-1 text-sm text-stone-600 flex justify-between items-center">
        <h2>{apiResponse?.items[0].statistics.viewCount}</h2>
        <span className="text-xs font-medium flex gap-4">
          <h3 className="flex items-center gap-1">
            <span className="size-1 bg-stone-900 rounded-full" />
            {formatDuration(
              convertToSeconds(apiResponse.items[0].contentDetails.duration)
            )}
          </h3>
          <h3 className="flex items-center gap-1">
            <span className="size-1 bg-stone-900 rounded-full" />
            {formatPrettyDate(apiResponse.items[0].snippet.publishedAt)}
          </h3>
        </span>
      </span>
    </span>
  );
};
export default VideoHeader;
