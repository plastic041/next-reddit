import { Flex } from "@radix-ui/themes";

import { Header } from "~/_components/header";

import type { ReactNode } from "react";

export default function Layout({
  params,
  children,
}: {
  params: { subreddit: string };
  children: ReactNode;
}) {
  return (
    <Flex className="h-screen" direction="column">
      <Header subreddit={params.subreddit} />
      {children}
    </Flex>
  );
}
