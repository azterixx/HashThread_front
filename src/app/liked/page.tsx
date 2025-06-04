import { Feed } from "@/components/Feed";

export default function LikedThreads() {
  return (
    <div className="mx-auto mt-3 w-full overflow-y-auto rounded-lg bg-bgDark md:w-1/2">
      <Feed type="likedThreads" />
    </div>
  );
}
