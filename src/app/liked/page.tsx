import { Feed } from "@/components/Feed";

export default function LikedThreads() {
  return (
    <div className="mx-auto w-full overflow-y-auto bg-bgDark md:w-1/2">
      <Feed type="likedThreads" />
    </div>
  );
}
