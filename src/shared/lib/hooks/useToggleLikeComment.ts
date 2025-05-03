import { toggleLikeComment } from "@/shared/api/Comments/api";
import { CommentType } from "@/shared/api/types/types";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useToggleLikeComment = (commentId: string, threadId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLikeComment(commentId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["comments", threadId] });

      const previousData = queryClient.getQueryData<InfiniteData<CommentType>>([
        "comments",
        threadId,
      ]);

      queryClient.setQueryData<InfiniteData<CommentType>>(
        ["comments", threadId],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              items: page.items.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      isLiked: !comment.isLiked,
                      likeCount: comment.isLiked
                        ? comment.likeCount - 1
                        : comment.likeCount + 1,
                    }
                  : comment,
              ),
            })),
          };
        },
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
