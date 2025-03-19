import { CreateThread } from "@/components/CreateThread";
import Feed from "@/components/Feed";

export default function Home() {
  return (
    <>
      <Feed>
        <CreateThread />
      </Feed>
    </>
  );
}
