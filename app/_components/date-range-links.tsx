"use client";

import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

import { DATE_RANGE } from "~/_typings/date-range";

export function DateRangeLinks() {
  const params = useParams();
  const searchParams = useSearchParams();

  const subreddit = params.subreddit;
  const dateRange = searchParams.get("t") || "week";
  const isCurrent = (dr: string) => dr === dateRange;

  return (
    <Flex direction="row" gap="1">
      {DATE_RANGE.map((dr) => (
        <Button asChild key={dr} variant={isCurrent(dr) ? "solid" : "soft"}>
          <Link href={`/r/${subreddit}?t=${dr}`}>{dr}</Link>
        </Button>
      ))}
    </Flex>
  );
}
