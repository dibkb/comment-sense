import { heading } from "@/fonts";
import { cn } from "@/lib/utils";
import React from "react";
import Arrowright from "../svg/Arrowright";
import { UserButton } from "@clerk/nextjs";
import Logo from "../svg/Logo";

const Navbar = () => {
  return (
    <main className="top-0 border-b h-12 fixed w-full z-[1000] bg-white flex">
      <div
        className={cn(
          "px-8 py-2 flex items-center justify-between w-full",
          heading.className
        )}
      >
        <button className={"flex items-center gap-2 font-medium"}>
          <Logo className="text-stone-800" />
          <p>Comment</p>
          <p className="">Sense</p>
        </button>
        <UserButton />
        {/* <button className="flex gap-2 items-center w-36 h-12 rounded-full relative bg-stone-700 group hover:bg-stone-100 group">
          <h2 className="absolute left-6 text-white group-hover:text-stone-800">
            Sign in
          </h2>
          <span className="w-10 h-10 flex items-center justify-center rounded-3xl absolute right-1 bg-stone-100 z-10">
            <Arrowright className="size-5" />
          </span>
        </button> */}
      </div>
    </main>
  );
};

export default Navbar;
