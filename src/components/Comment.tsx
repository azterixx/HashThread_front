import { cn, formatCount } from "@/shared/lib/utils";
import { Button } from "./ui";
import ShareIcon from "../icons/ShareIcon";
import MessageIcon from "@/icons/MessageIcon";
import FlameIcon from "../icons/FlameIcon";
import { CommentType } from "@/shared/api/types/types";
import BurningFlameIcon from "../icons/BurningFlameIcon";
import { useToggleLikeComment } from "@/shared/lib/hooks/useToggleLikeComment";
import { useCallback } from "react";

type CommentProps = {
  comment: CommentType;
  threadId: string;
};

export const Comments = ({ comment, threadId }: CommentProps) => {
  const { mutate: toggleLike, isPending } = useToggleLikeComment(
    comment.id,
    threadId,
  );
  console.log('комментари');
  return (
    <div className="flex gap-3 border-b-[1px] border-borderColor px-8 pb-4">
      <div className="h-9 w-9 rounded-full bg-[#999999]" />
      <div className="flex w-full flex-col gap-3">
        <div className="flex justify-between">
          <span className="font-medium text-white">Anonym</span>
        </div>
        <p className="font-inter text-sm text-white">{comment.text}</p>
        <div className="flex gap-1">
          <Button onClick={() => toggleLike()} disabled={isPending}>
            {comment.isLiked ? <BurningFlameIcon /> : <FlameIcon />}
            <span
              className={cn(
                "text-textGray",
                comment.isLiked && "text-primaryGreen",
              )}
            >
              {formatCount(comment.likeCount)}
            </span>
          </Button>
          <Button>
            <MessageIcon />
          </Button>
          <Button>
            <ShareIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
