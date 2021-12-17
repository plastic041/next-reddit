import type { Post } from "../typings/post";
import { Scrollbars } from "react-custom-scrollbars-2";

const PostView = ({ post }: { post: Post }) => {
  return (
    <Scrollbars
      className="self-start h-full col-span-2"
      autoHide
      autoHideTimeout={1000}
    >
      <main>
        <article className="p-4 flex flex-col gap-4 rounded-md bg-gray-50">
          <h1 className="text-3xl text-gray-900">
            <span className="font-light">u/{post.author} - </span>
            <span className="font-bold">{post.title}</span>
          </h1>
          <span>
            <a
              href={`https://reddit.com${post.link}`}
              className="text-blue-500 cursor-pointer"
            >
              Open in Reddit ↗
            </a>
          </span>
          <hr className="text-gray-500" />
          <p className="whitespace-pre-wrap text-lg text-gray-700">
            {post.body.trim()}
          </p>
        </article>
      </main>
    </Scrollbars>
  );
};

export default PostView;
