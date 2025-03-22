"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postThread } from "@/shared/api/Thread/api";
import { Button, Textarea } from "./ui";
import { cn } from "@/shared/lib/utils";
import { PostThreadResponse } from "@/shared/api/types/types";
import { useAutoResizeTextarea } from "@/shared/lib/hooks/useAutoResizeTextarea";
export const CreateThread = () => {
  const queryClient = useQueryClient();
  const { textAreaRef, text, setText, handleChange } = useAutoResizeTextarea();

  const { mutate, isPending } = useMutation<PostThreadResponse, Error, string>({
    mutationFn: postThread,
    onSuccess: () => {
      setText("");
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto";
      }
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });

  const handlePost = () => {
    if (!text.trim() || isPending) return;
    mutate(text);
  };

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
