import { CreateThreadAndComment } from "@/components/CreateThreadAndComment";
import { Feed } from "@/components/Feed";
import { Switcher } from "@/components/Switcher";


export default async function CommentsPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;

  return (
    <div className="mx-auto w-full overflow-y-auto bg-bgDark md:w-1/2">

      <div className="flex items-center justify-between px-3">
        <h3 className="py-4 text-xl text-white">Comments</h3>
        <Switcher />
      </div>
      <div className="border-b border-borderColor">
        <CreateThreadAndComment type="comment" threadId={threadId} />
      </div>
      <Feed type="comments" threadId={threadId} />
    </div>
  );
}
