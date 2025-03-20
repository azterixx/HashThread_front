"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikeThread } from "@/shared/api/Thread";
import FlameIcon from "../icons/FlameIcon";
import ShareIcon from "../icons/ShareIcon";
import MessageIcon from "../icons/MessageIcon";
import BurningFlameIcon from "../icons/BurningFlameIcon";
import { Button } from "./ui/button";
import { ThreadProps } from "@/shared/api/types/types";
import { useState } from "react";
import { Textarea } from "./ui";
import { useAutoResizeTextarea } from "@/lib/hooks/useAutoResizeTextarea";
import { Comments } from "./Comments";

function formatCount(count: number) {
  if (count === 0) return "";
  if (count >= 1000) return `${Math.floor(count / 1000)}k`;
  return String(count);
}

interface ThreadComponentProps {
  thread: ThreadProps;
}

export const Thread = ({ thread }: ThreadComponentProps) => {
  const [isComments, setIsComments] = useState(false);
  const [comments, setComments] = useState<
    { threadId: string; text: string }[]
  >([]);
  const { textAreaRef, text, setText, handleChange } = useAutoResizeTextarea();

  const queryClient = useQueryClient();

  const { mutate, isPending: isMutating } = useMutation({
    mutationFn: () => toggleLikeThread(thread._id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["threads"] });
      const previousData = queryClient.getQueryData<ThreadProps[]>(["threads"]);
      queryClient.setQueryData<ThreadProps[]>(["threads"], (oldData) =>
        oldData?.map((t) =>
          t._id === thread._id
            ? {
                ...t,
                isLiked: !t.isLiked,
                likeCount: t.isLiked ? t.likeCount - 1 : t.likeCount + 1,
              }
            : t,
        ),
      );
      return { previousData };
    },
    onError: (err, vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["threads"], context.previousData);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData<ThreadProps[]>(["threads"], (oldData) =>
        oldData?.map((t) =>
          t._id === thread._id
            ? {
                ...t,
                isLiked: data.isLiked,
                likeCount: data.likeCount,
              }
            : t,
        ),
      );
    },
  });
  const createComment = () => {
    setComments((prev) => [...prev, { threadId: thread._id, text }]);
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
          <Button onClick={() => mutate()} disabled={isMutating}>
            {thread.isLiked ? <BurningFlameIcon /> : <FlameIcon />}
            <span
              className={
                thread.isLiked
                  ? "font-inter text-xs font-xs leading-xs text-primaryGreen"
                  : "font-inter text-xs font-xs leading-xs text-textGray"
              }
            >
              {formatCount(thread.likeCount)}
            </span>
          </Button>

          <Button
            onClick={() => {
              setIsComments(!isComments);
              setText("");
            }}
          >
            {isComments ? (
              <span className="text-textGray">X</span>
            ) : (
              <MessageIcon />
            )}
            <span className="font-inter text-xs font-xs leading-xs text-textGray">
              {formatCount(comments.length)}
            </span>
          </Button>

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
          <div className="flex flex-col gap-5">
            {comments
              .filter((item) => item.threadId === thread._id)
              .map((item) => (
                <Comments key={item.text} text={item.text} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};
