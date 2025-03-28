import { baseInstance } from "../base";
import { PostThreadResponse } from "../types/types";

export const postThread = async (text: string) =>
  (
    await baseInstance.post<PostThreadResponse>(
      "/thread",
      { text },
      { withCredentials: true },
    )
  ).data;

export const toggleLikeThread = async (threadId: string) =>
  (
    await baseInstance.patch<{ likeCount: number; isLiked: boolean }>(
      `/thread/${threadId}/like`,
      {},
      { withCredentials: true },
    )
  ).data;
