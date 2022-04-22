import { useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "~/components/Header";
import PostList from "~/components/PostList";
import type { PostRaw } from "~/typings/post";
import PostView from "~/components/PostView";
import SimpleBar from "simplebar-react";
import { Tops } from "~/typings/Tops";
import { currentPostAtom } from "~/stores/post";
import { fetcher } from "~/lib/fetch";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import useSWR from "swr";

const Page = () => {
  const router = useRouter();

  const [subreddit, setSubreddit] = useState("");
  const [top, setTop] = useState<Tops | null>(null);

  useEffect(() => {
    setSubreddit(router.query.subreddit as string);
    setTop((router.query.t as Tops) || "week");
  }, [router.isReady, router.query.subreddit, router.query.t]);

  const { data: postsData } = useSWR<{
    data: {
      children: {
        data: PostRaw;
      }[];
    };
  }>(
    subreddit &&
      top &&
      `https://www.reddit.com/r/${subreddit}/top.json?t=${top}`,
    fetcher,
    {
      revalidateOnFocus: false,
      // refresh interval = 24 hours
      refreshInterval: 1000 * 60 * 60 * 24,
    }
  );

  const [currentPost] = useAtom(currentPostAtom);

  const onChangeTop = (_: any, value: Tops | null) => {
    if (value) {
      setTop(value);
      router.push(`/r/${subreddit}?t=${value}`);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header subreddit={subreddit} top={top} onChangeTop={onChangeTop} />
      {postsData?.data ? (
        <Box
          sx={{
            display: "flex",
            flex: 1,
            pb: 2,
            height: "1px",
            gap: 1,
          }}
        >
          <Box
            component={SimpleBar}
            autoHide={false}
            sx={{
              flex: 0,
              flexBasis: "33%",
              maxHeight: "100%",
            }}
          >
            <PostList
              posts={postsData.data.children.map((child) => child.data)}
            />
          </Box>
          <Box
            component="main"
            sx={{
              display: "flex",
              flex: 1,
            }}
          >
            {currentPost && <PostView post={currentPost} />}
          </Box>
        </Box>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Box>
  );
};

export default Page;
