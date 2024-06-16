import Tick from "@/components/svg/Tick";
import { cn } from "@/lib/utils";
import { Playfair_Display, Urbanist } from "next/font/google";
const heading = Playfair_Display({ subsets: ["latin"] });
const brand = Urbanist({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex flex-col gap-6 h-[100vh] border justify-center items-center">
      <span className="flex flex-col gap-4 items-center">
        <h2
          className={cn(
            "text-2xl text-stone-800 text-center",
            heading.className
          )}
        >
          Measure and Analyze YouTube Comment Sentiment Like Never Before with
        </h2>
        <span
          className={cn(
            "text-4xl flex gap-2 items-center px-4 py-2 rounded-xl",
            heading.className
          )}
        >
          Comment Sense
        </span>
      </span>
      {/* <p className="w-[.5px] h-12 bg-stone-400 rounded-full"></p> */}
      <p className="text-sm text-stone-600 mt-12">
        🚀 Discover What Your Favorite Channels and Creators Really Think with
        Our Advanced Sentiment Analysis Tools
      </p>
      <span className="flex border border-stone-300 rounded-2xl p-1 w-full max-w-[600px] h-12 hover:border-stone-900 group">
        <input
          type="text"
          className="flex-1 outline-none px-4 rounded-full bg-transparent"
          placeholder="https://www.youtube.com/watch?v=pwN8u6HFH8U"
        />
        <button
          className={cn(
            "hover:bg-stone-700 hover:text-white rounded-2xl px-4",
            heading.className
          )}
        >
          See Demo
        </button>
      </span>
      <span className="flex gap-9">
        <h2 className="text-xs flex items-center gap-1">
          <Tick className="text-stone-700 size-4" />
          100% free
        </h2>
        <h2 className="text-xs flex items-center gap-1">
          <Tick className="text-stone-700 size-4" />
          Using state-of-the-art LLM
        </h2>
        <h2 className="text-xs flex items-center gap-1">
          <Tick className="text-stone-700 size-4" />
          Support for Indian Languages
        </h2>
      </span>
    </main>
  );
}
