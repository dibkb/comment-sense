import { heading } from "@/fonts";
import { cn } from "@/lib/utils";
import Category from "../svg/Category";
import Family from "../svg/Family";

// Component to render video details
const VideoDetails = ({ apiResponse }: { apiResponse: any }) => (
  <span
    className={cn(
      "mt-2 flex items-center justify-between text-sm text-stone-700 border-b pb-2",
      heading.className
    )}
  >
    <h1 className="flex items-center gap-1">
      <Category className="size-4" />
      {apiResponse?.category}
    </h1>
    {apiResponse?.isFamilySafe && (
      <h1 className="flex items-center gap-1">
        <Family className="size-4" />
        Family Friendly
      </h1>
    )}
  </span>
);
export default VideoDetails;
