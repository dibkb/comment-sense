import Send from "@/components/svg/Send";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import React, { RefObject, useEffect, useRef, useState } from "react";
import Avatarchat from "./Avatar";
import Logo from "@/components/svg/Logo";
import { useSearchParams } from "next/navigation";
import { fastApiInstance } from "@/axios";
interface Chatcomponent {
  fullScreen?: boolean;
  parentRef?: RefObject<HTMLDivElement>;
}
const Chatcomponent = ({ fullScreen = false, parentRef }: Chatcomponent) => {
  const searchParams = useSearchParams();
  const ytid = searchParams.get("ytid");
  const { user } = useUser();
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState<AiChat[]>([]);
  const [loading, setLoading] = useState(false);
  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setChat((prev) => [...prev, { message: query, creator: "user" }]);
    setQuery("");
    const res = await fastApiInstance.post("/chat", {
      video_id: ytid,
      query,
    });
    const data = res.data;
    setChat((prev) => [
      ...prev,
      {
        creator: "ai",
        message: query,
      },
    ]);
    setLoading(false);
  }
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    if (parentRef?.current) {
      parentRef.current.scrollTop = parentRef.current.scrollHeight;
    }
  }, [chat, parentRef]);
  const aiLoading = () => {
    return (
      <div className="flex items-center gap-2">
        <Logo className="text-stone-800" />
        <div className="flex space-x-1 justify-start">
          <div className="h-2 w-2 bg-stone-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-stone-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-stone-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  };
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatsRender = (
    <main
      className="gap-4 flex flex-col w-full max-h-full overflow-y-scroll hide-scrollbar"
      ref={chatContainerRef}
    >
      {chat.map((c, id) => {
        if (c.creator === "user")
          return (
            <span key={id} className="w-full flex flex-col items-end gap-2">
              <Avatarchat url={user?.imageUrl} name={user?.fullName} />
              <p className="bg-stone-200 px-4 py-1 rounded-lg">{c.message}</p>
            </span>
          );
        else
          return (
            <span key={id}>
              <Logo className="text-stone-800" />
              <p className="bg-white px-4 py-1 rounded-lg">{c.message}</p>
            </span>
          );
      })}
      {loading && aiLoading()}
    </main>
  );
  return (
    <div
      className={cn(
        "h-full text-sm p-2 rounded-lg bg-stone-50",
        `${fullScreen} && bg-white`
      )}
    >
      <div className="relative h-full flex items-end pb-12">
        {chatsRender}
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-row rounded-xl text-sm border p-1 absolute bottom-0 bg-white"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none px-2 rounded-full bg-transparent font-medium"
            placeholder="Ask anything"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "bg-stone-700 hover:bg-stone-900 text-white rounded-xl px-2 py-1 flex items-center gap-2",
              loading && "opacity-30"
            )}
          >
            <Send />
            {"Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatcomponent;

interface AiChat {
  message: string;
  creator: "ai" | "user";
}
