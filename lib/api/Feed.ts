// src/api/feed.ts

export interface FeedData {
  _id: string;
  text: string;
  messageCount: number;
  likeCount: number;
  createdAt: string;
}

// Функция для получения данных с сервера
export const fetchFeed = async (): Promise<FeedData[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feed`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
