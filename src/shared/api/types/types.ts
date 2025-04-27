export interface ThreadType {
  id: string;
  text: string;
  messageCount: number;
  likeCount: number;
  isLiked: boolean;
}
export interface CommentType {
  id: string;
  text: string;
  messageNumber: number;
  likeCount: number;
  threadId: string;
  isLiked: boolean;
  replyTo: number;
}

// отправка данных
export interface PostThreadResponse {
  id: number;
  text: string;
}
export interface PostCommentResponse {
  threadId: string;
  text: string;
}
