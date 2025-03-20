import { toggleLikeThread } from "@/shared/api/Thread";
import { ThreadProps } from "@/shared/api/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleLike = (threadId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => toggleLikeThread(threadId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["threads"] });
      const previousData = queryClient.getQueryData<ThreadProps[]>(["threads"]);
      queryClient.setQueryData<ThreadProps[]>(["threads"], (oldData) =>
        oldData?.map((t) =>
          t._id === threadId
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
        queryClient.setQueryData(["threads"], context.previousData);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData<ThreadProps[]>(["threads"], (oldData) =>
        oldData?.map((t) =>
          t._id === threadId
            ? {
                ...t,
                isLiked: data.isLiked,
                likeCount: data.likeCount,
              }
            : t,
        ),
      );
    },
  });
};
