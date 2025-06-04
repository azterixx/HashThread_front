"use client";

import { getThread } from "@/shared/api/Thread/api";
import { useQuery } from "@tanstack/react-query";
import { Thread } from "./Thread";
import { FeedSkeleton } from "./FeedSkeleton";
import { CreateThreadAndComment } from "./CreateThreadAndComment";
import { useToogleComments } from "@/shared/store/ToogleComments";
import { memo } from "react";

interface ThreadWrapperProps {
  threadId?: string;
}

export const ThreadWrapper = memo(({ threadId }: ThreadWrapperProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["thread", threadId],
    queryFn: () => getThread(threadId),
  });
  const isActive = useToogleComments((state) => state.isActive);
  if (isLoading || !data) {
    return;
  }

  return (
    <div>
      <Thread thread={data} border={false} />

      {isActive && (
        <div className="border-b border-borderColor">
          <CreateThreadAndComment type="comment" threadId={threadId} />
        </div>
      )}
    </div>
  );
});
