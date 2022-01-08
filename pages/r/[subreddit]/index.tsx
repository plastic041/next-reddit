import { ChangeEvent, useEffect, useState } from "react";

import PostList from "../../../components/PostList";
import type { PostRaw } from "../../../typings/post";
import PostView from "../../../components/PostView";
import { currentPostAtom } from "../../../stores/post";
import { fetcher } from "../../../lib/fetch";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import useSWR from "swr";

const Page = () => {
  const router = useRouter();

  const [subreddit, setSubreddit] = useState("");
  const [top, setTop] = useState("");

  useEffect(() => {
    setSubreddit(router.query.subreddit as string);
    setTop((router.query.t as string) || "week");
  }, [router.isReady, router.query.subreddit, router.query.t]);

  const { data: postsData } = useSWR<{
    data: {
      children: {
        data: PostRaw;
      }[];
    };
  }>(
    subreddit &&
      top &&
      `https://www.reddit.com/r/${subreddit}/top.json?t=${top}`,
    fetcher
  );

  const [currentPost] = useAtom(currentPostAtom);

  const onClickTop = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    setTop(value);
    router.push(`/r/${subreddit}?t=${value}`);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <h1 className="m-4">
        r/{subreddit} -{" "}
        <select
          value={top}
          onChange={onClickTop}
          className="cursor-pointer bg-gray-50 p-1 rounded-md shadow-sm"
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="all">All</option>
        </select>
      </h1>
      <div className="flex flex-1 min-h-0 flex-row gap-3 xl:px-40 2xl:px-64 pb-4">
        {postsData?.data ? (
          <>
            <aside className="flex basis-1/3">
              <PostList
                posts={postsData.data.children.map((child) => child.data)}
              />
            </aside>
            <main className="flex basis-full md:basis-2/3">
              {currentPost && <PostView post={currentPost} />}
            </main>
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
