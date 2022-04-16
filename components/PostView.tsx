import "simplebar-react/dist/simplebar.min.css";

import {
  ClipboardCopyIcon,
  Link2Icon,
  ThickArrowUpIcon,
} from "@radix-ui/react-icons";
import { useEffect, useRef } from "react";

import type { Post } from "../typings/post";
import ReactMarkdown from "react-markdown";
import SimpleBar from "simplebar-react";
import remarkGfm from "remark-gfm";

const PostView = ({ post }: { post: Post }) => {
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
    <SimpleBar className="flex flex-1" autoHide={false}>
      <article
        ref={mainRef}
        className="p-4 flex flex-col rounded-md bg-gray-50 overflow-auto"
      >
        <div className="flex flex-row justify-between mb-2">
          <h1 className="text-3xl text-gray-900">
            <span className="font-light">u/{post.author} - </span>
            <span className="font-bold">{post.title}</span>
          </h1>
          <span className="mt-2 text-yellow-600 tabular-nums">
            <div className="flex flex-row items-center">
              <ThickArrowUpIcon />
              {post.score}
            </div>
          </span>
        </div>
        <span className="text-gray-600 text-sm">{makeDate()}</span>
        <span className="flex flex-row gap-2">
          <a
            href={`https://reddit.com${post.link}`}
            className="text-blue-500 cursor-pointer flex flex-row items-center gap-1 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Link2Icon />
            <span>Open in Reddit</span>
          </a>
          <button
            type="button"
            id="copy-link-button"
            className="text-green-500 cursor-pointer flex flex-row items-center active:translate-y-0.5"
            onClick={() => {
              // copy to clipboard using navigator.clipboard
              const text = `https://reddit.com${post.link}`;
              navigator.clipboard.writeText(text);
            }}
          >
            <ClipboardCopyIcon />
          </button>
        </span>
        <hr className="text-gray-500 my-2" />
        <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
          {post.body.trim()}
        </ReactMarkdown>
      </article>
    </SimpleBar>
  );
};

export default PostView;
