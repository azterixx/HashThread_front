import { PostCommentsResponse } from "@/shared/api/types/types";
import { Comments } from "./Comment";

interface CommentList {
  commentsData: PostCommentsResponse[] | undefined;
  threadId: string;
}

export const CommentList = ({ commentsData, threadId }: CommentList) => {
  return (
    <div className="flex flex-col gap-5">
      {commentsData
        ?.filter((item) => item.threadId === threadId)
        ?.map((item) => <Comments key={item.text} text={item.text} />)}
    </div>
  );
};
