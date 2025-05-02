import { baseInstance } from "../base";
import { ThreadType } from "../types/types";

export const fetchFeed = async (page: number) =>
  (
    await baseInstance.get<ThreadType>("/feed", {
      params: { page },
    })
  ).data;
