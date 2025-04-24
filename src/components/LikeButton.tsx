import BurningFlameIcon from "@/icons/BurningFlameIcon";
import { cn, formatCount } from "@/shared/lib/utils";

import { Button } from "./ui";
import FlameIcon from "@/icons/FlameIcon";

interface LikeButtonProps {
  onToggleLike: () => void;
  isLiked: boolean;
  likeCount: number;
  disabled?: boolean;
}

export const LikeButton = ({
  onToggleLike,
  disabled,
  isLiked,
  likeCount,
}: LikeButtonProps) => {
  return (
    <Button onClick={onToggleLike} disabled={disabled}>
      {isLiked ? <BurningFlameIcon /> : <FlameIcon />}
      <span className={cn("text-textGray", isLiked && "text-primaryGreen")}>
        {formatCount(likeCount)}
      </span>
    </Button>
  );
};
