"use client";
import ShareIcon from "../icons/ShareIcon";
import { Button } from "./ui/button";
import { ThreadType } from "@/shared/api/types/types";
import { useToggleLikeThread } from "@/shared/lib/hooks/useToggleLikeThread";
import { UserIcon } from "./UserIcon";
import { LikeButton } from "./LikeButton";
import { CommentButton } from "./CommentButton";

interface ThreadComponentProps {
  thread: ThreadType;
}
export const Thread = ({ thread }: ThreadComponentProps) => {
  const { mutate: toggleLike, isPending } = useToggleLikeThread(thread.id);


  return (
    <div className="min-h-[96px] animate-fadeIn border-b-2 border-borderColor">
      <div className="flex gap-3 p-4">
        <UserIcon />
        <div className="flex w-full flex-col gap-3">
          <span className="font-medium text-white">Anonym</span>

          <p className="font-inter text-sm text-textGray custom-wrap-class break-all">{thread.text}</p>

          <div className="flex gap-1">
            <LikeButton
              onToggleLike={() => toggleLike()}
              isLiked={thread.isLiked}
              disabled={isPending}
              likeCount={thread.likeCount}
            />
            <CommentButton
              href={`/comments/${thread.id}`}
              count={thread.messageCount}
            />

            <Button>
              <ShareIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
