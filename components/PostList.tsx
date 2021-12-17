import PostListItem from "./PostListItem";
import type { PostRaw } from "../typings/post";
import Scrollbars from "react-custom-scrollbars-2";

const PostList = ({ posts }: { posts: PostRaw[] }) => {
  return (
    <Scrollbars
      className="self-start h-full col-span-1"
      autoHide
      autoHideTimeout={1000}
    >
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li key={post.permalink}>
            <PostListItem
              title={post.title}
              score={post.score}
              body={post.selftext}
              author={post.author}
              link={post.permalink}
            />
          </li>
        ))}
      </ul>
    </Scrollbars>
  );
};

export default PostList;
