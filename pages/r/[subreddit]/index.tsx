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
    <div className="h-full flex flex-col">
      <h1 className="ml-4 mb-4">
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
      <div className="grid grid-cols-3 gap-1 xl:px-40 2xl:px-64 flex-grow">
        {postsData?.data ? (
          <>
            <div className="hidden md:flex col-span-1">
              <PostList
                posts={postsData.data.children.map((child) => child.data)}
              />
            </div>
            <div className="col-span-full md:col-span-2">
              {currentPost && <PostView post={currentPost} />}
            </div>
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
