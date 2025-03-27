import { baseInstance } from "../base";
import { PostCommentsResponse } from "../types/types";

export const postComment = async (threadId: string, text: string) =>
  (
    await baseInstance.post<PostCommentsResponse>("/comment", {
      threadId,
      text,
    })
  ).data;

export const getComments = async (threadId: string) =>
  (await baseInstance.get<PostCommentsResponse[]>(`/comment/${threadId}`)).data;

export const toggleLikeComment = async (commentId: string) =>
  (
    await baseInstance.patch<{ likeCount: number; isLiked: boolean }>(
      `/comment/${commentId}/like`,
      {},
      { withCredentials: true },
    )
  ).data;
