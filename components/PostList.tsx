import type { Post, PostRaw } from "../typings/post";

import PostListItem from "./PostListItem";
import Scrollbars from "react-custom-scrollbars-2";
import { getAwardsCount } from "../lib/awards";

const PostList = ({ posts }: { posts: PostRaw[] }) => {
  return (
    <Scrollbars
      className="self-start h-full col-span-1 relative hidden md:flex"
      autoHide
      autoHideTimeout={1000}
    >
      <ul className="flex flex-col gap-4 pr-3">
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
    </Scrollbars>
  );
};

export default PostList;
