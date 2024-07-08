"use client";

import SearchResults from "@/components/Inputfields/SearchResults";
import { Skeleton } from "@/components/ui/skeleton";
import { useRelatedVideos } from "@/hooks/useRelatedVideos";
import { useSearchParams } from "next/navigation";
import VideoUrlInput from "@/components/Inputfields/Videoinputfield";
import { cn } from "@/lib/utils";
import { heading } from "@/fonts";
function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const { loading, apiResponse } = useRelatedVideos(query || "");
  // Render search results
  const renderSearchResults = () => {
    if (loading || !apiResponse) {
      return (
        <div className="flex flex-col gap-3 p-2">
          {new Array(8).fill(0).map((a) => (
            <Skeleton key={a} className="border w-full h-44" />
          ))}
        </div>
      );
    }
    return <SearchResults searchVideos={apiResponse} size={"l"} />;
  };
  return (
    <main className="px-4 sm:px-8 pt-4">
      <div className="flex justify-center">
        <VideoUrlInput buttonText="Search" />
      </div>
      <span
        className={cn(
          "my-4 text-lg flex gap-1 justify-center",
          heading.className
        )}
      >
        Showing results for{" "}
        <p className="text-red-500 font-semibold">&#x301D; {query} &#x301E;</p>
      </span>
      <div className="">{renderSearchResults()}</div>
    </main>
  );
}
export default Search;
