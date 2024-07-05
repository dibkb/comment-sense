import Features from "@/components/Homepage/Featureslayout";
import Videourlinput from "@/components/Inputfields/Videoinputfield";
import { heading } from "@/fonts";
import { cn } from "@/lib/utils";
export default function Home() {
  return (
    <main
      className="flex flex-col gap-6 mt-24 sm:mt-0 sm:justify-center items-center px-4 sm:px-8 sm:pb-72 "
      style={{
        height: "calc(100vh - 3rem)",
      }}
    >
      <span className="flex flex-col gap-4 items-center">
        <h2
          className={cn(
            "sm:text-2xl text-md text-stone-800 text-center",
            heading.className
          )}
        >
          Measure and Analyze YouTube Comment Sentiment Like Never Before with
        </h2>
        <div className="sm:h-20 border-stone-700 relative">
          <span
            className={cn(
              "text-5xl sm:text-6xl flex gap-2 items-center px-4 py-2 rounded-xl text-center font-medium",
              heading.className
            )}
          >
            Comment Sense
          </span>
        </div>
      </span>
      <p className="text-xs sm:text-sm text-stone-600 sm:mt-9 text-center">
        Discover What Your Favorite Channels and Creators Really Think with Our
        Advanced Sentiment Analysis Tools 🛠️
      </p>
      <div className="max-w-[900px] w-full">
        <Videourlinput buttonText={"Search"} />
      </div>
      <span className="flex flex-col sm:flex-row gap-3 sm:gap-9 w-full sm:justify-center">
        <Features />
      </span>
    </main>
  );
}
