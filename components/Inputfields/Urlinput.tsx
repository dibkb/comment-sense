import { heading } from "@/fonts";
import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";
interface Urlinput {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  submitHandler: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}
const Urlinput = ({ state, setState, submitHandler, children }: Urlinput) => {
  return (
    <form
      onSubmit={submitHandler}
      className="w-full flex flex-row rounded-xl text-sm sm:text-base"
    >
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="flex-1 outline-none px-4 rounded-full bg-transparent font-medium"
        placeholder="Search or enter YouTube link"
      />
      <button
        type="submit"
        className={cn(
          "hover:bg-stone-700 text-xs sm:text-base hover:text-white rounded-2xl px-4 py-2",
          heading.className
        )}
      >
        {children}
      </button>
    </form>
  );
};

export default Urlinput;
