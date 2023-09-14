"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box, Card, Flex, ScrollArea, Separator } from "@radix-ui/themes";
import { useAtomValue } from "jotai";

import PostHeader from "~/_components/post-header";
import { currentPostAtom } from "~/_stores/post";

export function PostView() {
  const post = useAtomValue(currentPostAtom);

  const mainRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (mainRef.current) {
      console.log(mainRef.current.scrollHeight);
      mainRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [post]);

  if (!post) {
    return null;
  }

  return (
    <article className="col-span-2 grow min-h-0">
      <Card asChild>
        <Flex p="2" width="100%" className="h-full">
          <Flex direction="column" width="100%" className="h-full">
            <PostHeader post={post} />
            <Separator size="4" />
            <ScrollArea
              className="pr-2 h-full overflow-auto"
              scrollbars="vertical"
            >
              <Box ref={mainRef}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="prose max-w-none pr-2"
                >
                  {post.body.trim().replaceAll("&amp;#x200B;", "")}
                </ReactMarkdown>
              </Box>
            </ScrollArea>
          </Flex>
        </Flex>
      </Card>
    </article>
  );
}

export default PostView;
