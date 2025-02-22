import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikeThread, ThreadProps } from "../lib/api/Thread";
import FlameIcon from "./icons/FlameIcon";
import ShareIcon from "./icons/ShareIcon";
import MessageIcon from "./icons/MessageIcon";
import { ActionButton } from "./ActionButton";
import BurningFlameIcon from "./icons/BurningFlameIcon";

function formatCount(count: number) {
  if (count === 0) return "";
  if (count >= 1000) return `${Math.floor(count / 1000)}k`;
  return String(count);
}

interface ThreadComponentProps {
  thread: ThreadProps;
}

export const Thread: React.FC<ThreadComponentProps> = ({ thread }) => {
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

  return (
    <div
      // Вот тут добавляем класс анимации
      className="animate-fadeIn flex min-h-[96px] w-full gap-x-[12px] border-b-[1px] border-borderColor p-[16px]"
    >
      <div>
        <div className="h-[36px] w-[36px] rounded-full bg-[#999999]" />
      </div>

      <div className="flex flex-col gap-y-[12px]">
        <div className="flex flex-col gap-y-[6px]">
          <span className="inline-block h-[19px] font-inter font-mMedium leading-mMedium text-textWhite">
            Anonym
          </span>
          <p className="custom-wrap-class font-inter text-m font-m leading-m text-textWhite">
            {thread.text}
          </p>
        </div>

        <div className="flex h-[32px] w-full gap-x-[4px]">
          <ActionButton onClick={() => mutate()} disabled={isMutating}>
            {thread.isLiked ? <BurningFlameIcon /> : <FlameIcon />}
            <span
              className={
                thread.isLiked
                  ? "text-primaryGreen font-inter text-xs font-xs leading-xs"
                  : "font-inter text-xs font-xs leading-xs text-textGray"
              }
            >
              {formatCount(thread.likeCount)}
            </span>
          </ActionButton>

          <ActionButton>
            <MessageIcon />
            <span className="font-inter text-xs font-xs leading-xs text-textGray">
              {formatCount(thread.messageCount)}
            </span>
          </ActionButton>

          <ActionButton>
            <ShareIcon />
          </ActionButton>
        </div>
      </div>
    </div>
  );
};
