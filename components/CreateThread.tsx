"use client";

import React, { useState, useRef, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postThread, PostThreadResponse } from "../lib/api/Thread";

export const CreateThread = () => {
  const [text, setText] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  // Подключаем QueryClient для доступа к invalidateQueries
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<PostThreadResponse, Error, string>({
    mutationFn: postThread,

    onSuccess: (data: PostThreadResponse) => {
      // Очищаем текст и сбрасываем высоту textarea
      setText("");
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto";
      }
      console.log("Успешно создан тред с ID:", data.id);

      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },

    onError: (error: Error) => {
      console.error("Ошибка при создании треда:", error);
    },
  });

  // Автоматический resize для textarea
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
    if (!text.trim()) return; // Не даём отправлять пустое сообщение
    mutate(text);
  };

  return (
    <div className="h-auto w-full border-b border-borderColor">
      <div className="flex gap-3 p-4">
        {/* Аватар или иконка пользователя */}
        <div>
          <div className="h-9 w-9 rounded-full bg-blue-600" />
        </div>

        {/* Блок с textarea и кнопкой */}
        <div className="flex w-full flex-col gap-3">
          <textarea
            ref={textAreaRef}
            className="caret-primaryGreen w-full resize-none overflow-hidden rounded-md border border-transparent bg-bgDark p-2 font-inter text-m leading-m text-textGray focus:outline-none"
            placeholder="Type something interesting here"
            value={text}
            onChange={handleChange}
            rows={1}
          />
          <div className="flex w-full justify-end">
            <button
              type="button"
              onClick={handlePost}
              className={
                text
                  ? "bg-primaryGreen text-bgDarker h-[33px] w-[58px] rounded-[8px] text-center font-inter text-xs leading-xs"
                  : "h-[33px] w-[58px] rounded-[8px] border border-borderColor bg-bgLighter text-center font-inter text-xs leading-xs text-textWhite"
              }
            >
              {isPending ? "..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
