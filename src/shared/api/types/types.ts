export interface ThreadProps {
  _id: string;
  text: string;
  messageCount: number;
  likeCount: number;
  isLiked: boolean;
}

export interface PostThreadResponse {
  id: number;
  text: string;
}
export interface PostCommentsResponse {
  id: string;
  text: string;
  messageNumber: number;
  likeCount: number;
  threadId: string;
  isLiked: boolean;
}
