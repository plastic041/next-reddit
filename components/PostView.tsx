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

  const makeDate = () => {
    const year = post.createdAt.getFullYear();
    const month = post.createdAt.getMonth() + 1;
    const day = post.createdAt.getDate();
    return `${year}-${month}-${day}`;
  };

  return (
    <Scrollbars
      className="self-start h-full w-full`"
      autoHide
      autoHideTimeout={1000}
    >
      <main ref={mainRef}>
        <article className="p-4 flex flex-col rounded-md bg-gray-50 mb-80">
          <div className="flex flex-row justify-between mb-2">
            <h1 className="text-3xl text-gray-900">
              <span className="font-light">u/{post.author} - </span>
              <span className="font-bold">{post.title}</span>
            </h1>
            <span className="mt-2 text-yellow-600 tabular-nums">
              ⬆️{post.score}
            </span>
          </div>
          <span className="text-gray-600 text-sm">{makeDate()}</span>
          <span className="">
            <a
              href={`https://reddit.com${post.link}`}
              className="text-blue-500 cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Reddit ↗
            </a>
          </span>
          <hr className="text-gray-500 my-2" />
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
