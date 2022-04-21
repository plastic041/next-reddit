import { useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import type { Post } from "~/typings/post";
import PostHeader from "~/components/PostHeader";
import ReactMarkdown from "react-markdown";
import Stack from "@mui/material/Stack";
import remarkGfm from "remark-gfm";

const PostView = ({ post }: { post: Post }) => {
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mainRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [post]);

  return (
    <Box sx={{ pb: 1, display: "flex" }}>
      <Paper
        component="article"
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          flexGrow: 0,
        }}
      >
        <PostHeader post={post} />
        <Stack direction="column" spacing={1} sx={{ height: "1px", flex: 1 }}>
          <Divider />
          <Box
            sx={{
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <Box
              ref={mainRef}
              sx={{
                // remove first and list element's margin
                "& > *:first-child": {
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
