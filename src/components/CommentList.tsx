import { CommentType } from "@/shared/api/types/types";
import { Comments } from "./Comment";


interface CommentList {
  commentsData: CommentType[] | undefined;
  threadId: string;
}

export const CommentList = ({ threadId, commentsData }: CommentList) => {
  console.log("список");
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
