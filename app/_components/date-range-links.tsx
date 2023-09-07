import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";

import { DATE_RANGE } from "~/_typings/date-range";

type DateRangeLinksProps = {
  subreddit: string;
};

export function DateRangeLinks({ subreddit }: DateRangeLinksProps) {
  return (
    <Flex direction="row" gap="1">
      {DATE_RANGE.map((dr) => (
        <Button asChild key={dr} variant="soft">
          <Link href={`/r/${subreddit}?t=${dr}`}>{dr}</Link>
        </Button>
      ))}
    </Flex>
  );
}
