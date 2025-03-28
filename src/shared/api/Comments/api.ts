import { baseInstance } from "../base";
import { CommentType, PostCommentResponse } from "../types/types";

export const postComment = async (threadId: string, text: string) =>
  (
    await baseInstance.post<PostCommentResponse>("/comment", {
      threadId,
      text,
    })
  ).data;

export const getComments = async (threadId: string) =>
  (await baseInstance.get<CommentType[]>(`/comment/${threadId}`)).data;

export const toggleLikeComment = async (commentId: string) =>
  (
    await baseInstance.patch<{ likeCount: number; isLiked: boolean }>(
      `/comment/${commentId}/like`,
    )
  ).data;
