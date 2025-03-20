import { API_URL } from "../constants/constants";
import { PostCommentsResponse } from "./types/types";
// отправка комментов на сервак
export const postComment = async (threadId: string, text: string) => {
  const response = await fetch(`${API_URL}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ threadId, text }),
  });

  if (!response.ok) {
    throw new Error("Не удалось отправить пост");
  }

  const data = await response.json();
  return data;
};
//  получения коммента к треду

export const getComments = async (
  threadId: string,
): Promise<PostCommentsResponse[]> => {
  const responce = await fetch(`${API_URL}/comment/${threadId}`);

  return responce.json();
};
