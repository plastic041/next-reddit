import { DateRange } from "@/components/date-range.tsx";
import { PostCard, PostCardSkeleton } from "@/components/post-card.tsx";
import { PostView } from "@/components/post-view.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { H1 } from "@/components/ui/typography.tsx";
import { rootRoute } from "@/router.tsx";
import { Post, type Subreddit } from "@/typings/subreddit.ts";
import { Await, Route, defer } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import { type Output, fallback, object, parse, picklist } from "valibot";

type SubredditContentProps = {
  posts: Post[];
  activePostId: Post["id"] | null;
  setActivePostId: (id: Post["id"] | null) => void;
};
function SubredditContent({
  posts,
  activePostId,
  setActivePostId,
}: SubredditContentProps) {
  const activePost = posts.find((post) => post.id === activePostId);

  return (
    <div className="flex flex-row mt-4 min-h-0">
      <ScrollArea className="max-w-xs shrink-0">
        <ul className="flex flex-col space-y-4">
          {posts.map((post) => {
            const isActive = post.id === activePostId;
            function handleClick() {
              setActivePostId(post.id);
            }

            return (
              <li key={post.id}>
                <PostCard
                  post={post}
                  isActive={isActive}
                  onClick={handleClick}
                />
              </li>
            );
          })}
        </ul>
      </ScrollArea>
      {activePost !== undefined && (
        <ScrollArea className="ml-4 grow">
          <PostView post={activePost} />
        </ScrollArea>
      )}
    </div>
  );
}

function Fallback() {
  return (
    <div className="flex flex-row mt-4 min-h-0 h-full">
      <ScrollArea className="max-w-xs grow">
        <ul className="flex flex-col space-y-4">
          <li>
            <PostCardSkeleton />
          </li>
          <li>
            <PostCardSkeleton />
          </li>
          <li>
            <PostCardSkeleton />
          </li>
          <li>
            <PostCardSkeleton />
          </li>
          <li>
            <PostCardSkeleton />
          </li>
          <li>
            <PostCardSkeleton />
          </li>
          <li>
            <PostCardSkeleton />
          </li>
        </ul>
      </ScrollArea>
    </div>
  );
}

export function SubredditPage() {
  const { subreddit } = subredditRoute.useParams();
  const { postsPromise } = subredditRoute.useLoaderData();

  const [activePostId, setActivePostId] = useState<Post["id"] | null>(null);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <H1>r/{subreddit}</H1>
      <div className="mt-4 place-self-start">
        <DateRange />
      </div>
      <Suspense fallback={<Fallback />}>
        <Await promise={postsPromise}>
          {(posts) => (
            <SubredditContent
              posts={posts}
              activePostId={activePostId}
              setActivePostId={setActivePostId}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}

const DateRangeValueSchema = fallback(
  picklist(["day", "week", "month", "year", "all"]),
  "week"
);

const SearchSchema = object({
  t: DateRangeValueSchema,
});

export type DateRangeValue = Output<typeof DateRangeValueSchema>;

export const subredditRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/r/$subreddit",
  component: SubredditPage,
  validateSearch: (search) => parse(SearchSchema, search),

  loaderDeps: ({ search: { t } }) => ({ t }),
  loader: async ({ params: { subreddit }, deps: { t }, abortController }) => {
    const postsPromise = new Promise<Post[]>((resolve) => {
      const url = new URL(`https://www.reddit.com/r/${subreddit}/top.json`);
      url.searchParams.set("t", t);

      fetch(url.toString(), {
        signal: abortController.signal,
      })
        .then((response) => response.json())
        .then((json: Subreddit) => {
          const posts = json.data.children.map(({ data }) => data);
          resolve(posts);
        });
    });

    return {
      postsPromise: defer(postsPromise),
    };
  },

  staleTime: 1000 * 60 * 60, // 1 hour
});
