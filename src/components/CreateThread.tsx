"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postThread } from "@/shared/api/Thread/api";
import { Button, Textarea } from "./ui";
import { cn } from "@/shared/lib/utils";
import { useAutoResizeTextarea } from "@/shared/lib/hooks/useAutoResizeTextarea";
import { postComment } from "@/shared/api/Comments/api";

type CreateProps = {
  type?: "thread" | "comment";
  threadId?: string;
};

export const CreateThread = ({ type, threadId }: CreateProps) => {
  const queryClient = useQueryClient();
  const { textAreaRef, text, setText, handleChange } = useAutoResizeTextarea();

  const { mutate: threadMutate, isPending: isPendintThread } = useMutation({
    mutationFn: postThread,
    onSuccess: () => {
      setText("");
      textAreaRef.current!.style.height = "auto";
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });

  const { mutate: commentMutate, isPending: isPendintComment } = useMutation({
    mutationFn: () => postComment(threadId!, text),
    onSuccess: () => {
      setText("");
      textAreaRef.current!.style.height = "auto";
      queryClient.invalidateQueries({ queryKey: ["comments", threadId] });
    },
  });

  const handlePost = () => {
    if (!text.trim()) return;
    if (type === "comment") {
      commentMutate();
    } else {
      threadMutate(text);
    }
  };
  const isPending = type === "comment" ? isPendintComment : isPendintThread;

  // Функция для фокусировки на textarea
  const handleFocus = () => {
    textAreaRef.current?.focus();
  };

  return (
    // Добавляем onClick для фокусировки
    <div
      className="h-auto w-full border-b border-borderColor"
      onClick={handleFocus}
    >
      <div className="flex gap-3 p-4">
        {/* Аватар или иконка пользователя */}
        <div>
          <div className="h-9 w-9 rounded-full bg-[#999999]" />
        </div>

        {/* Блок с textarea и кнопкой */}
        <div className="flex w-full flex-col gap-3">
          <Textarea
            ref={textAreaRef}
            placeholder="Type something interesting here"
            value={text}
            onChange={handleChange}
            rows={1}
          />
          <div className="flex w-full justify-end">
            <Button
              variant={"create"}
              onClick={handlePost}
              disabled={isPending || !text.trim()}
              className={cn(
                text && !isPending && "bg-primaryGreen text-bgDarker",
              )}
            >
              {isPending ? "..." : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
