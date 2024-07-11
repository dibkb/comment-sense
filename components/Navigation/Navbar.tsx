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
          <Logo className="text-stone-800 size-7" />
          <p className={heading.className}>Comment</p>
          <p className={heading.className}>Sense</p>
        </button>
        <UserButton />
      </div>
    </main>
  );
};

export default Navbar;
