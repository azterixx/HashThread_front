import { CreateThread } from "@/components/CreateThread";
import { Feed } from "@/components/Feed";

export default function Home() {
  return (
    <div className="border- mx-auto mt-3 w-full overflow-y-auto rounded-t-lg bg-bgDark md:w-1/2">
      <CreateThread />
      <Feed />
    </div>
  );
}
