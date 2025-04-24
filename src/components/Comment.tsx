import { Button, Textarea } from "./ui";
import ShareIcon from "../icons/ShareIcon";
import { CommentType } from "@/shared/api/types/types";
import { useToggleLikeComment } from "@/shared/lib/hooks/useToggleLikeComment";
import { useState } from "react";
import { UserIcon } from "./UserIcon";
import { LikeButton } from "./LikeButton";
import { CommentButton } from "./CommentButton";

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
        <UserIcon />
        <div className="flex w-full flex-col gap-3">
          <span className="font-medium text-white">Anonym</span>

          <p className="font-inter text-sm text-textGray">{comment.text}</p>

          <div className="flex gap-1">
            <LikeButton
              onToggleLike={() => toggleLike()}
              disabled={isPending}
              isLiked={comment.isLiked}
              likeCount={comment.likeCount}
            />
            <CommentButton
              count={2}
              isActive={isCommentOpen}
              onClick={toggleComment}
            />
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
