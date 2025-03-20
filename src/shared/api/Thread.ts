import { API_URL } from "../constants/constants";
import { PostThreadResponse } from "./types/types";


export async function toggleLikeThread(threadId: string) {
  const res = await fetch(`${API_URL}/thread/${threadId}/like`, {
    method: "PATCH",
    credentials: "include", // прокидываем куки, если нужно
  });

  if (!res.ok) {
    throw new Error("Failed to toggle like");
  }

  // Предполагаем ответ вида: { likeCount: number; isLiked: boolean }
  return res.json() as Promise<{ likeCount: number; isLiked: boolean }>;
}


/**
 * Функция, отправляющая POST-запрос на создание треда
 */
export async function postThread(text: string): Promise<PostThreadResponse> {
  const response = await fetch(`${API_URL}/thread`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Не удалось отправить пост");
  }

  // Предположим, что сервер вернёт JSON вида { id: number; text: string; ... }
  const data = (await response.json()) as PostThreadResponse;
  return data;
}
