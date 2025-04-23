import { cn, formatCount } from "@/shared/lib/utils";
import { Button, Textarea } from "./ui";
import ShareIcon from "../icons/ShareIcon";
import MessageIcon from "@/icons/MessageIcon";
import FlameIcon from "../icons/FlameIcon";
import { CommentType } from "@/shared/api/types/types";
import BurningFlameIcon from "../icons/BurningFlameIcon";
import { useToggleLikeComment } from "@/shared/lib/hooks/useToggleLikeComment";
import { useState } from "react";

type CommentProps = {
  comment: CommentType;
  threadId: string;
};

export const Comments = ({ comment, threadId }: CommentProps) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const { mutate: toggleLike, isPending } = useToggleLikeComment(
    comment.id,
    threadId,
  );

  const toggleComment = () => {
    setIsCommentOpen((prev) => !prev);
  };
  console.log("комментари");
  return (
    <div className="min-h-[96px] animate-fadeIn border-b-2 border-borderColor">
      <div className="flex gap-3 p-4">
        <div className="h-9 w-9 rounded-full bg-[#999999]" />

        <div className="flex w-full flex-col gap-3">
          <div className="flex justify-between">
            <span className="font-medium text-white">Anonym</span>
          </div>

          <p className="font-inter text-sm text-textGray">{comment.text}</p>
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
            <Button onClick={toggleComment}>
              <MessageIcon
                className={cn(
                  "text-textGray",
                  isCommentOpen && "text-primaryGreen",
                )}
              />
              <span
                className={cn(
                  "text-textGray",
                  isCommentOpen && "text-primaryGreen",
                )}
              >
                {formatCount(5)}
              </span>
            </Button>
            <Button>
              <ShareIcon />
            </Button>
          </div>
        </div>
      </div>

      {isCommentOpen && (
        <>
          <div>
            <div className="flex gap-3 p-4">
              {/* Аватар или иконка пользователя */}
              <div>
                <div className="h-7 w-7 rounded-full bg-[#999999]" />
              </div>

              <div className="flex w-full flex-col gap-3 border-b-2 border-borderColor pb-1">
                <Textarea
                  placeholder="Type something interesting here"
                  rows={1}
                />
                <div className="flex w-full justify-end">
                  <Button variant={"create"}>Create</Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
