import { PostList } from "~/_components/post-list/list";
import { PostView } from "~/_components/post-view";

import type { DateRange } from "~/_typings/date-range";
import type { PostRaw } from "~/_typings/post";

export default async function Page({
  params,
  searchParams,
}: {
  params: { subreddit: string };
  searchParams: { range?: DateRange };
}) {
  const subreddit = params.subreddit;
  const top = searchParams.range ?? "week";

  const res = await fetch(
    `https://www.reddit.com/r/${subreddit}/top.json?t=${top}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );
  const postsData = (await res.json()) as {
    data: {
      children: {
        data: PostRaw;
      }[];
    };
  };

  return (
    <div className="grid grid-cols-3 w-full h-full min-h-0">
      <PostList posts={postsData.data.children.map((child) => child.data)} />
      <PostView />
    </div>
  );
}
