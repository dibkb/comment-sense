import { heading } from "@/fonts";
import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";
interface Urlinput {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  butttonClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}
const Urlinput = ({
  state,
  setState,
  butttonClickHandler,
  children,
}: Urlinput) => {
  return (
    <>
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="flex-1 outline-none px-4 rounded-full bg-transparent font-medium"
        placeholder="https://www.youtube.com/watch?v=pwN8u6HFH8U"
      />
      <button
        onClick={butttonClickHandler}
        className={cn(
          "hover:bg-stone-700 hover:text-white rounded-2xl px-4",
          heading.className
        )}
      >
        {children}
      </button>
    </>
  );
};

export default Urlinput;
