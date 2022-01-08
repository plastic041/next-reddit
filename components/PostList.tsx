import "simplebar-react/dist/simplebar.min.css";

import type { Post, PostRaw } from "../typings/post";

import PostListItem from "./PostListItem";
import SimpleBar from "simplebar-react";
import { getAwardsCount } from "../lib/awards";

const PostList = ({ posts }: { posts: PostRaw[] }) => {
  return (
    <SimpleBar className="flex flex-1">
      <ul className="flex flex-col gap-4 overflow-auto">
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
      </ul>
    </SimpleBar>
  );
};

export default PostList;
