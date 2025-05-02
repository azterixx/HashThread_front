"use client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchFeed } from "@/shared/api/Feed/api";
import {
  CommentItems,
  CommentType,
  ThreadItems,
  ThreadType,
} from "@/shared/api/types/types";
import { Thread } from "./Thread";
import { FeedSkeleton } from "./FeedSkeleton";
import { getComments } from "@/shared/api/Comments/api";
import { Comments } from "./Comment";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type FeedProps = {
  type?: "threads" | "comments";
  threadId?: string;
};

export function Feed({ type = "threads", threadId }: FeedProps) {

  const queryKey = type === "threads" ? ["threads"] : ["comments", threadId];
  const { ref, inView, entry } = useInView();
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<ThreadType | CommentType>({
    queryKey,
    queryFn: ({ pageParam }) =>
      type === "threads"
        ? fetchFeed(Number(pageParam))
        : getComments(threadId ?? "", Number(pageParam)),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (Number(lastPage.meta.currentPage) < lastPage.meta.totalPages) {
        return Number(lastPage.meta.currentPage) + 1;
      } else {
        return undefined;
      }
    },
  });

  useEffect(() => {
    if (entry && inView) {
      fetchNextPage();
    }
  }, [entry]);

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
      <>
        {data?.pages.map((page) => {
          return type === "threads"
            ? (page.items as ThreadItems[]).map((item) => (
                <Thread thread={item} key={item.id} />
              ))
            : (page.items as CommentItems[])
                .filter((comment) => comment.replyTo === null)
                .map((comment) => (
                  <Comments
                    key={comment.id}
                    comment={comment}
                    threadId={threadId!}
                    replies={(page.items as CommentItems[]).filter(
                      (item) => item.replyTo === comment.messageNumber,
                    )}
                  />
                ));
        })}
        {isFetchingNextPage ? (
          <FeedSkeleton />
        ) : (
          hasNextPage && <div ref={ref} />
        )}
      </>
    </div>
  );
}
