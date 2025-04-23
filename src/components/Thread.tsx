"use client";
import { useQuery } from "@tanstack/react-query";
import FlameIcon from "../icons/FlameIcon";
import ShareIcon from "../icons/ShareIcon";
import MessageIcon from "../icons/MessageIcon";
import BurningFlameIcon from "../icons/BurningFlameIcon";
import { Button } from "./ui/button";
import { ThreadType } from "@/shared/api/types/types";
import { useToggleLikeThread } from "@/shared/lib/hooks/useToggleLikeThread";
import { getComments } from "@/shared/api/Comments/api";
import { cn, formatCount } from "@/shared/lib/utils";
import Link from "next/link";

interface ThreadComponentProps {
  thread: ThreadType;
}
export const Thread = ({ thread }: ThreadComponentProps) => {
  const { mutate: toggleLike, isPending } = useToggleLikeThread(thread.id);

  const { data: commentsData } = useQuery({
    queryKey: ["comments", thread.id],
    queryFn: () => getComments(thread.id),
    select: (data) => data || [],
  });

  console.log("тред");

  return (
    <div className="min-h-[96px] animate-fadeIn border-b-2 border-borderColor">
      <div className="flex gap-3 p-4">
        <div className="h-9 w-9 rounded-full bg-[#999999]" />

        <div className="flex w-full flex-col gap-3">
          <div className="flex justify-between">
            <span className="font-medium text-white">Anonym</span>
          </div>

          <p className="font-inter text-sm text-textGray">{thread.text}</p>

          <div className="flex gap-1">
            <Button onClick={() => toggleLike()} disabled={isPending}>
              {thread.isLiked ? <BurningFlameIcon /> : <FlameIcon />}
              <span
                className={cn(
                  "text-textGray",
                  thread.isLiked && "text-primaryGreen",
                )}
              >
                {formatCount(thread.likeCount)}
              </span>
            </Button>
            <Link href={`/comments/${thread.id}`}>
              <Button>
                <MessageIcon className="text-textGray" />
                <span className="text-textGray">
                  {formatCount(commentsData?.length ?? 0)}
                </span>
              </Button>
            </Link>

            <Button>
              <ShareIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
