import Features from "@/components/Homepage/Featureslayout";
import Videourlinput from "@/components/Inputfields/Videoinputfield";
import { heading } from "@/fonts";
import { cn } from "@/lib/utils";
export default function Home() {
  return (
    <main className="flex flex-col gap-6 h-[100vh] border justify-center items-center pb-72">
      <span className="flex flex-col gap-4 items-center">
        <h2
          className={cn(
            "text-2xl text-stone-800 text-center",
            heading.className
          )}
        >
          Measure and Analyze YouTube Comment Sentiment Like Never Before with
        </h2>
        <div className="h-20 border-stone-700 relative">
          <span
            className={cn(
              "text-6xl flex gap-2 items-center px-4 py-2 rounded-xl font-medium",
              heading.className
            )}
          >
            Comment Sense
          </span>
        </div>
      </span>
      <p className="text-sm text-stone-600 mt-9">
        Discover What Your Favorite Channels and Creators Really Think with Our
        Advanced Sentiment Analysis Tools 🛠️
      </p>
      <Videourlinput buttonText={"See Demo"} />
      <span className="flex gap-9">
        <Features />
      </span>
    </main>
  );
}
