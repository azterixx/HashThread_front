import { ThreadProps } from "./Thread";
import { API_URL } from "../constants/constants";

export async function fetchFeed(): Promise<ThreadProps[]> {
  const response = await fetch(`${API_URL}/feed`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
