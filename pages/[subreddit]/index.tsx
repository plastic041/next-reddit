import { Suspense, useState } from "react";

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

  const [top, setTop] = useState("week");

  const { data: postsData } = useSWR<{
    data: {
      children: {
        data: PostRaw;
      }[];
    };
  }>(`https://www.reddit.com/r/${subreddit}/top.json?t=${top}`, fetcher);
  const [currentPost] = useAtom(currentPostAtom);

  return (
    <div className="h-full flex flex-col">
      <h1 className="mb-4">
        r/{subreddit} -{" "}
        <select value={top} onChange={(e) => setTop(e.currentTarget.value)}>
          <option value="day">day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="all">All</option>
        </select>
      </h1>
      <div className="grid grid-cols-3 gap-1 lg:px-64 flex-grow">
        {postsData?.data ? (
          <>
            <PostList
              posts={postsData.data.children.map((child) => child.data)}
            />
            {currentPost && <PostView post={currentPost} />}
          </>
        ) : (
          <div className="flex flex-row justify-center col-span-full">
            loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
