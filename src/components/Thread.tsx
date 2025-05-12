"use client";
import ShareIcon from "../icons/ShareIcon";
import { Button } from "./ui/button";
import { ThreadItems, ThreadType } from "@/shared/api/types/types";
import { useToggleLikeThread } from "@/shared/lib/hooks/useToggleLikeThread";
import { UserIcon } from "./UserIcon";
import { LikeButton } from "./LikeButton";
import { CommentButton } from "./CommentButton";
import { useState } from "react";
import { ImageModal } from "./ImageModal";

interface ThreadComponentProps {
  thread: ThreadItems;
}
export const Thread = ({ thread }: ThreadComponentProps) => {
  const { mutate: toggleLike, isPending } = useToggleLikeThread(thread.id);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-[96px] animate-fadeIn border-b-2 border-borderColor">
      <div className="flex gap-3 p-4">
        <UserIcon size="lg" />
        <div className="flex w-full flex-col gap-3">
          <span className="font-medium text-white">Anonym</span>

          <p className="custom-wrap-class font-inter text-m font-m leading-m text-textWhite">
            {thread.text}
          </p>

          <div className="flex gap-2 overflow-x-auto">
            {thread.files &&
              thread.files.length > 0 &&
              thread.files.map((item) => (
                <img
                  onClick={() => setSelectedImage(item)}
                  className="h-auto w-96 rounded-lg object-cover"
                  src={item}
                  key={item}
                />
              ))}
          </div>
          
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
      {selectedImage && (
        <ImageModal
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};
