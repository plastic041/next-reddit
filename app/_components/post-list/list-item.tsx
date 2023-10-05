"use client";

import { useAtom } from "jotai";

import type { Post } from "~/_typings/post";
import { currentPostAtom } from "~/_stores/post";
import { Box, Flex, Text } from "@radix-ui/themes";
import { ThickArrowUpIcon } from "@radix-ui/react-icons";

const PostListItem = ({ post }: { post: Post }) => {
  const [currentPost, setCurrentPost] = useAtom(currentPostAtom);
  const isCurrent = currentPost?.title === post.title;

  const onClick = () => {
    setCurrentPost(post);
  };

  return (
    <Box
      p="2"
      className={`${
        isCurrent
          ? "bg-[var(--accent-3)] shadow-md"
          : "bg-[var(--accent-1)] shadow-none hover:shadow"
      } flex flex-col border rounded-md transition-all border-[var(--gray-6)] `}
      asChild
    >
      <button onClick={onClick}>
        <Flex direction="column">
          <Text size="3" align="left">
            {post.title}
          </Text>
          <Text size="2" align="left" color="gray">
            {post.body.trim().slice(0, 100)}...
          </Text>
        </Flex>
        <Flex
          direction="row"
          align="center"
          justify="end"
          className="text-[#70695a] w-full"
        >
          <ThickArrowUpIcon />
          <Text size="2">{post.score}</Text>
        </Flex>
      </button>
    </Box>
  );
};

export default PostListItem;
