import { PostCommentsResponse } from "@/shared/api/types/types";
import { Comments } from "./Comment";

interface CommentList {
  commentsData: PostCommentsResponse[] | undefined;
  threadId: string;
}

export const CommentList = ({ threadId, commentsData }: CommentList) => {
  return (
    <div className="flex flex-col gap-3">
      {commentsData?.map((item, index) => (
        <Comments threadId={threadId} key={index} comment={item} />
      ))}

      {commentsData?.length === 0 && (
        <p className="text-center text-[18px] text-textGray">Nothing here</p>
      )}
    </div>
  );
};
