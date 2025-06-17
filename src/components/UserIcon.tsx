import Avatar from "boring-avatars";
import { memo, useMemo } from "react";

interface UserIconProps {
  size: "lg" | "md";
}

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export const UserIcon = memo(({ size }: UserIconProps) => {
  const avatarSize = size === "lg" ? 36 : 24;

  const variants = [
    "beam",
    "marble",
    "pixel",
    "sunset",
    "ring",
    "bauhaus",
  ] as const;

  const userId = getCookie("userId") ?? "guest"; // fallback, если куки нет

  // Чтоб всегда был один и тот же вариант — выбираем по userId
  const variantIndex = userId
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0) % variants.length;

  const selectedVariant = variants[variantIndex];

  return (
    <Avatar
      size={avatarSize}
      name={userId}
      variant={selectedVariant}
    />
  );
});
