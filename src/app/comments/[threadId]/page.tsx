import { CreateThread } from "@/components/CreateThread";
import { Feed } from "@/components/Feed";


export default async function CommentsPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;

  return (
    <div className="mx-auto w-full overflow-y-auto bg-bgDark md:w-1/2">
      <h3 className="px-3 py-4 text-xl text-white">Comments</h3>
      <CreateThread type="comment" threadId={threadId} />
      <Feed type="comments" threadId={threadId} />
    </div>
  );
}
