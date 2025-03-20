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
