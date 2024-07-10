import Logo from "@/components/svg/Logo";
import { cn } from "@/lib/utils";
import React from "react";

interface Chatloadingprops {
  fullScreen?: boolean;
}
const Chatloading = ({ fullScreen = false }: Chatloadingprops) => {
  return (
    <div
      className={cn(
        "h-full",
        "text-sm p-2 rounded-lg bg-stone-50 flex items-center justify-center"
      )}
    >
      <div className="flex items-center gap-2">
        <Logo className="text-stone-800 size-9" />
        <div className="flex space-x-1 justify-start">
          <div className="h-2 w-2 bg-stone-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 bg-stone-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 bg-stone-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Chatloading;
