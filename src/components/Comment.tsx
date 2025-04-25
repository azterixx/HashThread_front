import { Button, Textarea } from "./ui";
import ShareIcon from "../icons/ShareIcon";
import { CommentType } from "@/shared/api/types/types";
import { useToggleLikeComment } from "@/shared/lib/hooks/useToggleLikeComment";
import { useState } from "react";
import { UserIcon } from "./UserIcon";
import { LikeButton } from "./LikeButton";
import { CommentButton } from "./CommentButton";
import { useAutoResizeTextarea } from "@/shared/lib/hooks/useAutoResizeTextarea";
import { postComment } from "@/shared/api/Comments/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CommentProps = {
  comment: CommentType;
  threadId: string;
};

export const Comments = ({ comment, threadId }: CommentProps) => {
  const queryClient = useQueryClient();
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const { text, handleChange, setText, textAreaRef } = useAutoResizeTextarea();
  const { mutate: toggleLike, isPending } = useToggleLikeComment(
    comment.id,
    threadId,
  );

  const { mutate: commentMutate } = useMutation({
    mutationFn: () => postComment(comment.id, text),
    onSuccess: () => {
      setText("");
      textAreaRef.current!.style.height = "auto";
      queryClient.invalidateQueries({ queryKey: ["reply", comment.id] });
    },
  });

  const handlePost = () => {
    if (!text.trim()) return;
    commentMutate();
  };

  return (
    <>
      <div className="min-h-[96px] animate-fadeIn border-b-2 border-borderColor">
        <div className="flex gap-3 p-4">
          <UserIcon />
          <div className="flex w-full flex-col gap-3">
            <span className="font-medium text-white">Anonym</span>

            <p className="custom-wrap-class font-inter text-m font-m leading-m text-textWhite">
              {comment.text}
            </p>

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
                onClick={() => setIsCommentOpen(true)}
              />
              <Button>
                <ShareIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isCommentOpen && (
        <>
          <div className="border-b-2 border-borderColor pl-14">
            <div className="flex gap-3 p-4">
              {/* Аватар или иконка пользователя */}
              <div>
                <div className="h-7 w-7 rounded-full bg-[#999999]" />
              </div>

              <div className="flex w-full flex-col gap-3">
                <Textarea
                  value={text}
                  onChange={handleChange}
                  placeholder="Type something interesting here"
                  rows={1}
                />
                <div className="flex w-full justify-end gap-2">
                  <Button
                    onClick={() => setIsCommentOpen(false)}
                    variant={"create"}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePost}
                    variant={"create"}
                    className="bg-primaryGreen text-bgDarker"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
