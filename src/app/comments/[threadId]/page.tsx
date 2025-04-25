import { CreateThread } from "@/components/CreateThread";
import { Feed } from "@/components/Feed";
import { Switcher } from "@/components/Switcher";

export default async function CommentsPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;

  return (
    <div className="mx-auto w-full overflow-y-auto bg-bgLighter md:w-1/2">
      <div className="flex items-center justify-between px-3">
        <h3 className="py-4 text-xl text-white">Comments</h3>
        <Switcher />
      </div>
      <CreateThread type="comment" threadId={threadId} />
      <Feed type="comments" threadId={threadId} />
    </div>
  );
}
