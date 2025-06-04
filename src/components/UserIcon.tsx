import { cn } from "@/shared/lib/utils";
import { memo } from "react";

interface UserIconProps {
  size: "lg" | "md";
}

export const UserIcon = memo(({ size }: UserIconProps) => {
  return (
    <div>
      <div
        className={cn(
          "rounded-full bg-[#999999]",
          size === "lg" && "h-9 w-9",
          size === "md" && "h-6 w-6",
        )}
      />
    </div>
  );
});
