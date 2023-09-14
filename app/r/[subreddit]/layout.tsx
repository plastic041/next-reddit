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
    <div className="h-screen w-screen grid-rows-[min-content_auto] grid-cols-1 grid">
      <Header subreddit={params.subreddit} />
      {children}
    </div>
  );
}
