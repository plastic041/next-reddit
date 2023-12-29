import { H2, P, Ul } from "@/components/ui/typography.tsx";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import type { Post } from "../typings/subreddit.ts";

type PostViewProps = {
  post: Post;
};
export function PostView({ post }: PostViewProps) {
  const createdAt = new Date(post.created_utc * 1000);

  const articleRef = useRef<HTMLDivElement | null>(null);
  // biome-ignore lint/correctness/useExhaustiveDependencies: post should be the dependency
  useEffect(() => {
    if (articleRef.current) {
      articleRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [post]);

  return (
    <article
      className="flex flex-col px-8 py-4 border border-slate-500"
      ref={articleRef}
    >
      <div className="flex flex-col">
        <p className="text-sm text-muted-foreground">
          u/{post.author} - {createdAt.toLocaleDateString()}
        </p>
        <H2>{post.title}</H2>
      </div>
      <Markdown
        components={{
          h2(props) {
            return <H2 {...props} />;
          },
          p(props) {
            return <P {...props} />;
          },
          ul(props) {
            return <Ul {...props} />;
          },
        }}
      >
        {post.selftext.replaceAll("&amp;#x200B;", "")}
      </Markdown>
    </article>
  );
}
