import Send from "@/components/svg/Send";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const Chatcomponent = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="h-full text-sm p-2 rounded-lg bg-stone-100">
      <div className="relative h-full">
        <form
          // onSubmit={submitHandler}
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
