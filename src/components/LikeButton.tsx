import { cn, formatCount } from "@/shared/lib/utils";
import { Button } from "./ui";
import Heart from "@/icons/HeartIcon";

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
    <Button onClick={onToggleLike} disabled={disabled} className="px-4">
      <Heart className={cn(isLiked ? "fill-primaryGreen" : "fill-textGray")} />
      <span className={cn("text-textGray", isLiked && "text-primaryGreen")}>
        {formatCount(likeCount)}
      </span>
    </Button>
  );
};
