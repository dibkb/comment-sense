import Send from "@/components/svg/Send";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useRef, useState } from "react";
import Avatarchat from "./Avatar";

const Chatcomponent = () => {
  const { user } = useUser();
  const [query, setQuery] = useState("");
  const [chat, setChat] = useState<AiChat[]>([
    {
      message: "Who is narendra modi",
      creator: "user",
    },
    {
      message:
        "I'm sorry, but based on the provided video transcript context and video info, there is no information related to Narendra Modi. Therefore, I am unable to provide an answer to your question within the given context. If you have any other questions related to the content provided, feel free to ask.",
      creator: "ai",
    },
    {
      message: "Who is narendra modi",
      creator: "user",
    },
    {
      message:
        "I'm sorry, but based on the provided video transcript context and video info, there is no information related to Narendra Modi. Therefore, I am unable to provide an answer to your question within the given context. If you have any other questions related to the content provided, feel free to ask.",
      creator: "ai",
    },
    {
      message: "Who is narendra modi",
      creator: "user",
    },
    {
      message:
        "I'm sorry, but based on the provided video transcript context and video info, there is no information related to Narendra Modi. Therefore, I am unable to provide an answer to your question within the given context. If you have any other questions related to the content provided, feel free to ask.",
      creator: "ai",
    },
    {
      message: "Who is narendra modi",
      creator: "user",
    },
    {
      message:
        "I'm sorry, but based on the provided video transcript context and video info, there is no information related to Narendra Modi. Therefore, I am unable to provide an answer to your question within the given context. If you have any other questions related to the content provided, feel free to ask.",
      creator: "ai",
    },
    {
      message: "Who is narendra modi",
      creator: "user",
    },
    {
      message:
        "I'm sorry, but based on the provided video transcript context and video info, there is no information related to Narendra Modi. Therefore, I am unable to provide an answer to your question within the given context. If you have any other questions related to the content provided, feel free to ask.",
      creator: "ai",
    },
  ]);
  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setChat((prev) => [...prev, { message: query, creator: "user" }]);
    setQuery("");
  }
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatsRender = (
    <main
      className="gap-4 flex flex-col max-h-full overflow-y-scroll"
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
              <p className="bg-transparent px-4 py-1 rounded-lg">{c.message}</p>
            </span>
          );
      })}
    </main>
  );
  return (
    <div className="h-full text-sm p-2 rounded-lg bg-stone-50">
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
          />
          <button
            type="submit"
            className={cn(
              "bg-stone-700 hover:bg-stone-900 text-white rounded-xl px-2 py-1 flex items-center gap-2"
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
