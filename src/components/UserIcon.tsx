import Avatar from "boring-avatars";
import { memo } from "react";

interface UserIconProps {
  size: "lg" | "md";
}

export const UserIcon = memo(({ size }: UserIconProps) => {
  const avatarSize = size === "lg" ? 36 : 24;

  const variant = [
    "beam",
    "marble",
    "beam",
    "pixel",
    "sunset",
    "ring",
    "bauhaus",
  ] as const;

  const randomVariant = variant[Math.floor(Math.random() * variant.length)];

  return (
    <Avatar
      size={avatarSize}
      name={Math.random().toString()}
      variant={randomVariant}
    />
  );
});
