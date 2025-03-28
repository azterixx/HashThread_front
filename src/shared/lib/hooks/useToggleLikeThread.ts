import { toggleLikeThread } from "@/shared/api/Thread/api";
import { ThreadType } from "@/shared/api/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleLikeThread = (threadId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => toggleLikeThread(threadId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["threads"] });
      const previousData = queryClient.getQueryData<ThreadType[]>(["threads"]);
      queryClient.setQueryData<ThreadType[]>(["threads"], (oldData) =>
        oldData?.map((t) =>
          t.id === threadId
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

  });
};
