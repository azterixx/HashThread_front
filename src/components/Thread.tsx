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
import { useAutoResizeTextarea } from "@/shared/lib/hooks/useAutoResizeTextarea";
import { useToggleLikeThread } from "@/shared/lib/hooks/useToggleLikeThread";
import { getComments, postComment } from "@/shared/api/Comments/api";
import { CommentList } from "./CommentList";
import { cn, formatCount } from "@/shared/lib/utils";
import { X } from "lucide-react";

interface ThreadComponentProps {
  thread: ThreadProps;
}
export const Thread = ({ thread }: ThreadComponentProps) => {
  console.log(thread.id)
  const [isComments, setIsComments] = useState(false);
  const { textAreaRef, text, setText, handleChange } = useAutoResizeTextarea();

  const { mutate: toggleLike, isPending } = useToggleLikeThread(thread.id);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => postComment(thread.id, text),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", thread.id],
      });
      setText("");
    },
  });
  const { data: commentsData } = useQuery({
    queryKey: ["comments", thread.id],
    queryFn: () => getComments(thread.id),
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
    <div className="min-h-[96px] animate-fadeIn border-b-2 border-borderColor">
      <div className="flex gap-3 p-4">
        <div className="h-9 w-9 rounded-full bg-[#999999]" />

        <div className="flex w-full flex-col gap-3">
          <div className="flex justify-between">
            <span className="font-medium text-white">Anonym</span>
          </div>

          <p className="font-inter text-sm text-white">{thread.text}</p>

          <div className="flex gap-1">
            <Button onClick={() => toggleLike()} disabled={isPending}>
              {thread.isLiked ? <BurningFlameIcon /> : <FlameIcon />}
              <span className={cn(thread.isLiked && "text-primaryGreen")}>
                {formatCount(thread.likeCount)}
              </span>
            </Button>
            <Button onClick={toogleComment}>
              {isComments ? <X className="text-textGray" /> : <MessageIcon />}
              <span className="text-textGray">
                {formatCount(commentsData?.length ?? 0)}
              </span>
            </Button>
            <Button>
              <ShareIcon />
            </Button>
          </div>
        </div>
      </div>

      {isComments && (
        <>
          <div>
            <div className="border-b-[1px] border-t-[1px] border-borderColor">
              <h4 className="p-4 text-[20px] text-textWhite">Comments</h4>
            </div>
            <div className="flex gap-3 p-4">
              {/* Аватар или иконка пользователя */}
              <div>
                <div className="h-7 w-7 rounded-full bg-[#999999]" />
              </div>

              <div className="flex w-full flex-col gap-3 border-b-2 border-borderColor pb-1">
                <Textarea
                  ref={textAreaRef}
                  placeholder="Type something interesting here"
                  value={text}
                  onChange={handleChange}
                  rows={1}
                />
                <div className="flex w-full justify-end">
                  <Button variant={"create"} onClick={createComment}>
                    {isPending ? "..." : "Create"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <CommentList commentsData={commentsData} />
        </>
      )}
    </div>
  );
};
