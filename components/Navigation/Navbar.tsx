import { heading } from "@/fonts";
import { cn } from "@/lib/utils";
import React from "react";
import Arrowright from "../svg/Arrowright";

const Navbar = () => {
  return (
    <div
      className={cn(
        "py-2 px-4 border-b border-stone-300 flex items-center justify-between",
        heading.className
      )}
    >
      <button className={"flex items-center gap-2 font-medium"}>
        <p>Comment</p>
        <p className="">Sense</p>
      </button>
      <button className="flex gap-2 items-center w-36 h-12 rounded-full relative bg-stone-700 group hover:bg-stone-100 group">
        <h2 className="absolute left-6 text-white group-hover:text-stone-800">
          Sign in
        </h2>
        <span className=" w-10 h-10 flex items-center justify-center rounded-3xl bg-transparent absolute right-1 bg-stone-100">
          <Arrowright className="size-5" />
        </span>
      </button>
    </div>
  );
};

export default Navbar;
