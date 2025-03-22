// src/components/Feed.tsx
"use client";
import React, { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFeed } from "@/shared/api/Feed/api";
import { ThreadProps } from "@/shared/api/types/types";
import { Thread } from "./Thread";
import { FeedSkeleton } from "./FeedSkeleton";

interface FeedProps {
  children?: ReactNode;
}

export function Feed({ children }: FeedProps) {
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
      <div className="mx-auto w-full overflow-y-auto bg-bgDark md:w-1/2">
        {children}
        <FeedSkeleton />
      </div>
    );
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mx-auto w-full overflow-y-auto bg-bgDark md:w-1/2">
      {children}
      <div>
        {feedData?.map((thread) => <Thread key={thread._id} thread={thread} />)}
      </div>
    </div>
  );
}

export default Feed;
