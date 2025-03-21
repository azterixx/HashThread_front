"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FlameIcon from "../icons/FlameIcon";
import ShareIcon from "../icons/ShareIcon";
import MessageIcon from "../icons/MessageIcon";
import BurningFlameIcon from "../icons/BurningFlameIcon";
import { Button } from "./ui/button";
import { ThreadProps } from "@/shared/api/types/types";
import { useState } from "react";
import { Textarea } from "./ui";
import { useAutoResizeTextarea } from "@/lib/hooks/useAutoResizeTextarea";
import { useToggleLike } from "@/lib/hooks/useToggleLike";
import { getComments, postComment } from "@/shared/api/Comments/api";
import { CommentList } from "./CommentList";
import { cn, formatCount } from "@/lib/utils";

interface ThreadComponentProps {
  thread: ThreadProps;
}
export const Thread = ({ thread }: ThreadComponentProps) => {
  const [isComments, setIsComments] = useState(false);
  const { textAreaRef, text, setText, handleChange } = useAutoResizeTextarea();
  const { mutate: toggleLike, isPending } = useToggleLike(thread._id);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => postComment(thread._id, text),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", thread._id],
      });
      setText("");
    },
  });
  const { data: commentsData } = useQuery({
    queryKey: ["comments", thread._id],
    queryFn: () => getComments(thread._id),
  });

  const createComment = () => {
    if (!text.trim()) return;
    mutate();
  };

  const toogleComment = () => {
    setIsComments(!isComments);
    setText("");
  };
  return (
    <div
      // Вот тут добавляем класс анимации
      className="flex min-h-[96px] w-full animate-fadeIn flex-col gap-[15px] border-b-[1px] border-borderColor p-[16px]"
    >
      <div className="flex gap-x-[12px]">
        <div className="h-[36px] w-[36px] rounded-full bg-[#999999]" />
        <div className="flex flex-col gap-y-[6px]">
          <span className="inline-block h-[19px] font-inter font-mMedium leading-mMedium text-textWhite">
            Anonym
          </span>
          <p className="custom-wrap-class font-inter text-m font-m leading-m text-textWhite">
            {thread.text}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-y-[12px]">
        <div className="flex h-[32px] w-full gap-x-[4px]">
          {/* лайк */}
          <Button onClick={() => toggleLike()} disabled={isPending}>
            {thread.isLiked ? <BurningFlameIcon /> : <FlameIcon />}
            <span
              className={cn(
                thread.isLiked &&
                  "font-inter text-xs font-xs leading-xs text-primaryGreen",
              )}
            >
              {formatCount(thread.likeCount)}
            </span>
          </Button>
          {/* коммент */}
          <Button onClick={toogleComment}>
            {isComments ? (
              <span className="text-textGray">X</span>
            ) : (
              <MessageIcon />
            )}
            <span className="font-inter text-xs font-xs leading-xs text-textGray">
              {formatCount(commentsData?.length ?? 0)}
            </span>
          </Button>
            {/* поделится  */}
          <Button>
            <ShareIcon />
          </Button>
        </div>
      </div>

      {isComments && (
        <>
          <div className="flex w-full flex-col gap-3 border-b-2 border-borderColor pb-3">
            <Textarea
              className=""
              ref={textAreaRef}
              onChange={handleChange}
              placeholder="Comment"
              rows={1}
              value={text}
            />
            <div className="flex w-full justify-end">
              <Button onClick={createComment} variant={"create"}>
                Create
              </Button>
            </div>
          </div>
          <CommentList commentsData={commentsData} threadId={thread._id} />
        </>
      )}
    </div>
  );
};
