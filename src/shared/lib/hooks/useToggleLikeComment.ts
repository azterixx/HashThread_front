import { toggleLikeComment } from "@/shared/api/Comments/api";
import { CommentType } from "@/shared/api/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleLikeComment = (commentId: string, threadId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLikeComment(commentId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["comments", threadId] });

      const previousData = queryClient.getQueryData<CommentType[]>([
        "comments",
        threadId,
      ]);

      queryClient.setQueryData<CommentType[]>(
        ["comments", threadId],
        (oldData) =>
          oldData?.map((t) =>
            t.id === commentId
              ? {
                  ...t,
                  isLiked: !t.isLiked,
                  likeCount: t.isLiked ? t.likeCount - 1 : t.likeCount + 1,
                }
              : t,
          ),
      );
      return { previousData };
    },
    onError: (err, vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["comments", threadId], context.previousData);
      }
    },
  });
};
