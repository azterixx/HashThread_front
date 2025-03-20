"use client";
import React, { useState, useRef, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postThread, PostThreadResponse } from "@/shared/api/Thread";
import { Button, Textarea } from "./ui";
import { cn } from "@/lib/utils";
export const CreateThread = () => {
  const [text, setText] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<PostThreadResponse, Error, string>({
    mutationFn: postThread,
    onSuccess: (data: PostThreadResponse) => {
      setText("");
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto";
      }
      console.log("Успешно создан тред с ID:", data.id);
      void queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
    onError: (error: Error) => {
      console.error("Ошибка при создании треда:", error);
    },
  });

  const autoResize = useCallback(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    autoResize();
  };

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
                text &&
                  !isPending &&
                  "bg-primaryGreen text-bgDarker",
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
