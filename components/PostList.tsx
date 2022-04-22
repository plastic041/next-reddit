import type { Post, PostRaw } from "../typings/post";

import PostListItem from "./PostListItem";
import Stack from "@mui/material/Stack";
import { getAwardsCount } from "../lib/awards";

const PostList = ({ posts }: { posts: PostRaw[] }) => {
  return (
    <Stack
      component="ul"
      spacing={2}
      sx={{
        listStyleType: "none",
        p: 2,
        pr: 3,
        m: 0,
      }}
    >
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
          <li key={postRaw.permalink}>
            <PostListItem post={post} />
          </li>
        );
      })}
    </Stack>
  );
};

export default PostList;
