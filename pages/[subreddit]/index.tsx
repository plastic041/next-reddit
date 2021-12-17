import PostList from "../../components/PostList";
import type { PostRaw } from "../../typings/post";
import PostView from "../../components/PostView";
import { currentPostAtom } from "../../stores/post";
import { fetcher } from "../../lib/fetch";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import useSWR from "swr";

const Page = () => {
  const router = useRouter();
  const subreddit = router.query.subreddit as string;
  const { data: postsData, error } = useSWR<{
    data: {
      children: {
        data: PostRaw;
      }[];
    };
  }>(`https://www.reddit.com/r/${subreddit}/top.json?t=week`, fetcher);
  const [currentPost] = useAtom(currentPostAtom);

  if (error) return <div>failed to load</div>;
  if (!postsData) return <div>loading...</div>;

  return (
    <div className="h-full flex flex-col">
      <h1 className="mb-4">r/{subreddit}</h1>
      <div className="grid grid-cols-3 gap-4 lg:px-64 flex-grow">
        <PostList posts={postsData.data.children.map((child) => child.data)} />
        {currentPost && <PostView post={currentPost} />}
      </div>
    </div>
  );
};

export default Page;
