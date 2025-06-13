"use client";
import ShareIcon from "../icons/ShareIcon";
import { Button } from "./ui/button";
import { ThreadItems, ThreadType } from "@/shared/api/types/types";
import { useToggleLikeThread } from "@/shared/lib/hooks/useToggleLikeThread";
import { UserIcon } from "./UserIcon";
import { LikeButton } from "./LikeButton";
import { CommentButton } from "./CommentButton";
import { memo, useEffect, useState } from "react";
import { ImageModal } from "./ImageModal";
import { cn } from "@/shared/lib/utils";
import { useToogleComments } from "@/shared/store/ToogleComments";

interface ThreadComponentProps {
  thread: ThreadItems;
  border?: boolean;
  href?: string;
  type?: "threadPage";
}
export const Thread = memo(
  ({ thread, border = true, href, type }: ThreadComponentProps) => {
    const { mutate: toggleLike, isPending } = useToggleLikeThread(thread.id);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const setIsActive = useToogleComments((state) => state.setIsActive);
    const isActive = useToogleComments((state) => state.isActive);

    const toggleComment = () => {
      if (type === "threadPage") {
        setIsActive(!isActive);
      }
    };

    return (
      <div
        className={cn(
          "min-h-[96px] animate-fadeIn",
          border && "border-b-2 border-borderColor",
        )}
      >
        <div className="flex gap-3 p-4">
          <UserIcon size="lg" />
          <div className="flex w-full flex-col gap-3">
            <span className="font-medium text-white">Anonym</span>

            <p className="custom-wrap-class font-inter text-m font-m leading-m text-textWhite">
              {thread.text}
            </p>

            <div className="scrollbar-hide flex gap-2 overflow-x-auto">
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
                href={href}
                isActive={isActive}
                count={thread.messageCount}
                onClick={toggleComment}
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
  },
);
