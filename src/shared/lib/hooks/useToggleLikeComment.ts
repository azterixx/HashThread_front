import { toggleLikeComment } from "@/shared/api/Comments/api";
import { PostCommentsResponse } from "@/shared/api/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleLikeComment = (commentId: string, threadId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => toggleLikeComment(commentId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["comments", threadId] });

      const previousData = queryClient.getQueryData<PostCommentsResponse[]>([
        "comments",
        threadId,
      ]);

      queryClient.setQueryData<PostCommentsResponse[]>(
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", threadId] });
    },
  });
};

