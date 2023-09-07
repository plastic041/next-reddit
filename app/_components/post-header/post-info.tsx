import { ThickArrowUpIcon, CalendarIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";

import type { Post } from "~/_typings/post";

const PostInfo = ({ post }: { post: Post }) => {
  const { score, createdAt } = post;

  const year = createdAt.getFullYear();
  const month = createdAt.getMonth() + 1;
  const day = createdAt.getDate();
  const createdAtString = `${year}-${month}-${day}`;

  return (
    <Flex direction="row" gap="4">
      <Flex
        direction="row"
        gap="1"
        align="center"
        className="text-[var(--accent-9)]"
      >
        <CalendarIcon />
        <Text>{createdAtString}</Text>
      </Flex>
      <Flex direction="row" gap="1" align="center" className="text-[#CA8A04]">
        <ThickArrowUpIcon />
        <Text>{score}</Text>
      </Flex>
    </Flex>
  );
};

export default PostInfo;
