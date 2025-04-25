// компонент для комментариев у комментария

import { CommentType } from "@/shared/api/types/types";

interface CommentListProps {
  comments: CommentType[] | undefined;
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div>{comments?.map((item) => <div key={item.id}>{item.text}</div>)}</div>
  );
};
