import { baseInstance } from "../base";
import { ThreadProps } from "../types/types";

export const fetchFeed = async () =>
  (await baseInstance.get<ThreadProps[]>("/feed", { withCredentials: true }))
    .data;
