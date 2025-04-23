"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchFeed } from "@/shared/api/Feed/api";
import { CommentType, ThreadType } from "@/shared/api/types/types";
import { Thread } from "./Thread";
import { FeedSkeleton } from "./FeedSkeleton";
import { getComments } from "@/shared/api/Comments/api";
import { Comments } from "./Comment";

type FeedProps = {
  type?: "threads" | "comments";
  threadId?: string;
};

export function Feed({ type = "threads", threadId }: FeedProps) {
  const queryFn = type === "threads" ? fetchFeed : () => getComments(threadId ?? "");
  const queryKey = type === "threads" ? ["threads"] : ["comments", threadId];

  const { data, error, isLoading } = useQuery<ThreadType[] | CommentType[]>({
    queryKey: queryKey,
    queryFn: queryFn,
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
      {type === "threads"
        ? (data as ThreadType[])?.map((thread) => (
            <Thread key={thread.id} thread={thread} />
          ))
        : (data as CommentType[])?.map((comment) => (
            <Comments comment={comment} threadId={threadId!} />
          ))}
    </div>
  );
}


