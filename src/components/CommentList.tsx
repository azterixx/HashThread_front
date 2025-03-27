import { PostCommentsResponse } from "@/shared/api/types/types";
import { Comments } from "./Comment";

interface CommentList {
  commentsData: PostCommentsResponse[] | undefined;
}

export const CommentList = ({ commentsData }: CommentList) => {
  return (
    <div className="flex flex-col gap-3">
      {commentsData?.map((item, index) => (
        <Comments key={index} comment={item}/>
      ))}
      
      {commentsData?.length === 0 && <p className="text-textGray text-center text-[18px]">Nothing here</p>}
    </div>
  );
};
