import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, Text } from "@radix-ui/themes";
import { DateRangeLinks } from "~/_components/date-range-links";

type HeaderProps = {
  subreddit: string;
};

export function Header({ subreddit }: HeaderProps) {
  return (
    <Flex
      direction="row"
      align="center"
      mb="2"
      p="4"
      className="bg-[var(--accent-1)] col-span-3"
    >
      <Text className="grow" size="6">
        r/{subreddit}
      </Text>
      <Flex align="center" gap="2">
        <DateRangeLinks />
        <IconButton asChild>
          <a
            href="https://github.com/plastic041/next-reddit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubLogoIcon />
          </a>
        </IconButton>
      </Flex>
    </Flex>
  );
}
