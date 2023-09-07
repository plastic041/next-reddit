import IconButtons from "./post-header/icon-buttons";
import PostInfo from "./post-header/post-info";

import type { Post } from "~/_typings/post";
import { Flex, Text } from "@radix-ui/themes";

const PostHeader = ({ post }: { post: Post }) => {
  const { title, author } = post;

  return (
    <Flex direction="column">
      <h2>
        <Text size="6" as="span" weight="light">
          u/{author} -{" "}
        </Text>
        <Text size="6" as="span" weight="bold">
          {title}
        </Text>
      </h2>
      <Flex direction="row" align="center" justify="between">
        <PostInfo post={post} />
        <IconButtons post={post} />
      </Flex>
    </Flex>
  );
};

export default PostHeader;
