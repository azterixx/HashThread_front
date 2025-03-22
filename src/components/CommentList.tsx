import { PostCommentsResponse } from "@/shared/api/types/types";
import { Comments } from "./Comment";

interface CommentList {
  commentsData: PostCommentsResponse[] | undefined;
}

export const CommentList = ({ commentsData }: CommentList) => {
  return (
    <div className="flex flex-col gap-5">
      {commentsData?.map((item) => (
        <Comments key={item.text} text={item.text} />
      ))}
    </div>
  );
};
