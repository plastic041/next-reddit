import { Flex, ScrollArea } from "@radix-ui/themes";

import type { Post, PostRaw } from "~/_typings/post";
import { getAwardsCount } from "~/_lib/awards";
import PostListItem from "./list-item";

export function PostList({ posts }: { posts: PostRaw[] }) {
  return (
    <ScrollArea
      scrollbars="vertical"
      className="col-span-1 h-full overflow-auto"
      type="always"
    >
      <Flex direction="column" asChild gap="3" pr="3">
        <ul>
          {posts.map((postRaw) => {
            const post: Post = {
              title: postRaw.title,
              score: postRaw.score,
              body: postRaw.selftext,
              author: postRaw.author,
              link: postRaw.permalink,
              createdAt: new Date(postRaw.created_utc * 1000),
              awardsCount: getAwardsCount(postRaw),
            };

            return (
              <li key={postRaw.permalink} className="contents">
                <PostListItem post={post} />
              </li>
            );
          })}
        </ul>
      </Flex>
    </ScrollArea>
  );
}
