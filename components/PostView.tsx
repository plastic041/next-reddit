import { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import type { Post } from "~/typings/post";
import PostHeader from "~/components/PostHeader";
import ReactMarkdown from "react-markdown";
import Stack from "@mui/material/Stack";
import remarkGfm from "remark-gfm";
import SimpleBar from "simplebar-react";

const PostView = ({ post }: { post: Post }) => {
  const mainRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [post]);

  return (
    <Box sx={{ pb: 1, display: "flex", width: "100%" }}>
      <Paper
        component="article"
        elevation={3}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          flexGrow: 0,
          width: "100%",
        }}
      >
        <PostHeader post={post} />
        <Stack direction="column" spacing={1} sx={{ height: "1px", flex: 1 }}>
          <Divider />
          <Box
            component={SimpleBar}
            autoHide={false}
            scrollableNodeProps={{
              ref: mainRef,
            }}
            sx={{
              maxHeight: "100%",
              pr: 3,
            }}
          >
            <Box
              sx={{
                // remove first and list element's margin
                "& > *:first-of-type": {
                  mt: 0,
                },
                "& > *:last-child": {
                  mb: 0,
                },
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.body.trim()}
              </ReactMarkdown>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default PostView;
