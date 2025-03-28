import { baseInstance } from "../base";
import { ThreadType } from "../types/types";

export const fetchFeed = async () =>
  (await baseInstance.get<ThreadType[]>("/feed")).data;
