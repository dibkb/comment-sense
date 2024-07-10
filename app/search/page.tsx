"use client";

import SearchResults from "@/components/Inputfields/SearchResults";
import { Skeleton } from "@/components/ui/skeleton";
import { useRelatedVideos } from "@/hooks/useRelatedVideos";
import { useSearchParams } from "next/navigation";
import VideoUrlInput from "@/components/Inputfields/Videoinputfield";
import { cn } from "@/lib/utils";
import { heading } from "@/fonts";
import Image from "next/image";
import Link from "next/link";
function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const { loading, apiResponse, error } = useRelatedVideos(query || "");
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
  // TODO: error handling search
  if (error) {
    return (
      <main className="flex flex-col items-center justify-center py-24">
        <Image
          src={
            "https://cdn.dribbble.com/userupload/3496364/file/original-b6be68de66ceaa407fd2dd723d4e59ca.jpg?resize=400x400"
          }
          alt="404 page"
          height={400}
          width={400}
        />
        <h2 className="text-2xl font-semibold">
          Looks like something went wrong...
        </h2>
        <Link href={"/"} className="mt-4 border px-4 py-1 rounded-lg">
          Go Home
        </Link>
      </main>
    );
  }
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
