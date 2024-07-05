"use client";

import SearchResults from "@/components/Inputfields/SearchResults";
import { Skeleton } from "@/components/ui/skeleton";
import { useRelatedVideos } from "@/hooks/useRelatedVideos";
import { useSearchParams } from "next/navigation";

function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const { loading, apiResponse } = useRelatedVideos(query || "");
  // Render search results
  const renderSearchResults = () => {
    if (loading || !apiResponse) {
      return (
        <div className="flex flex-col gap-3 p-2">
          {new Array(4).fill(0).map((a) => (
            <Skeleton key={a} className="border w-full h-16" />
          ))}
        </div>
      );
    }
    return <SearchResults searchVideos={apiResponse} size={"l"} />;
  };
  return <div className="px-4 sm:px-8 ">{renderSearchResults()}</div>;
}
export default Search;
