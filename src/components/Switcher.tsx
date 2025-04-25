"use client";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";

export const Switcher = () => {
  const [isActive, setIsActive] = useState("popular");
  return (
    <div className="rounded-lg bg-bgDark p-[2px]">
      <button
        onClick={() => setIsActive("popular")}
        className={cn(
          "px-3 py-1 text-textGray",
          isActive === "popular" && "rounded-lg bg-[#CCCCCC] text-bgDarker",
        )}
      >
        Popular
      </button>
      <button
        onClick={() => setIsActive("all")}
        className={cn(
          "px-3 py-1 text-textGray",
          isActive === "all" && "rounded-lg bg-[#CCCCCC] text-bgDarker",
        )}
      >
        All
      </button>
    </div>
  );
};
