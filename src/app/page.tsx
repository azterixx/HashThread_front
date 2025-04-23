import { CreateThread } from "@/components/CreateThread";
import { Feed } from "@/components/Feed";

export default function Home() {
  return (
    <div className="mx-auto w-full overflow-y-auto bg-bgDark md:w-1/2">
      <CreateThread />
      <Feed />
    </div>
  );
}
