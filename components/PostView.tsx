import { useEffect, useRef } from "react";

import DOMPurify from "dompurify";
import type { Post } from "../typings/post";
import { Scrollbars } from "react-custom-scrollbars-2";
import { marked } from "marked";

const PostView = ({ post }: { post: Post }) => {
  const body = DOMPurify.sanitize(marked(post.body));
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mainRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [post]);

  return (
    <Scrollbars
      className="self-start h-full col-span-2"
      autoHide
      autoHideTimeout={1000}
    >
      <main ref={mainRef}>
        <article className="p-4 flex flex-col gap-4 rounded-md bg-gray-50">
          <div className="flex flex-row justify-between">
            <h1 className="text-3xl text-gray-900">
              <span className="font-light">u/{post.author} - </span>
              <span className="font-bold">{post.title}</span>
            </h1>
            <span className="mt-2 text-yellow-600 tabular-nums">
              ⬆️{post.score}
            </span>
          </div>
          <span>
            <a
              href={`https://reddit.com${post.link}`}
              className="text-blue-500 cursor-pointer"
            >
              Open in Reddit ↗
            </a>
          </span>
          <hr className="text-gray-500" />
          <p
            className="whitespace-pre-wrap prose"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </article>
      </main>
    </Scrollbars>
  );
};

export default PostView;
