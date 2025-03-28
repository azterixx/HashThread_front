"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchFeed } from "@/shared/api/Feed/api";
import { ThreadProps } from "@/shared/api/types/types";
import { Thread } from "./Thread";
import { FeedSkeleton } from "./FeedSkeleton";

export function Feed() {
  const {
    data: feedData,
    error,
    isLoading,
  } = useQuery<ThreadProps[]>({
    queryKey: ["threads"],
    queryFn: fetchFeed,
    refetchInterval: 10_000,
  });

  if (isLoading) {
    return (
      <>
        <FeedSkeleton />
      </>
    );
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {feedData?.map((thread) => <Thread key={thread.id} thread={thread} />)}
    </div>
  );
}

export default Feed;
