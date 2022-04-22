import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Paper from "@mui/material/Paper";
import type { Post } from "../typings/post";
import Stack from "@mui/material/Stack";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Typography from "@mui/material/Typography";
import { currentPostAtom } from "../stores/post";
import { useAtom } from "jotai";
import { teal } from "@mui/material/colors";

const PostListItem = ({ post }: { post: Post }) => {
  const [currentPost, setCurrentPost] = useAtom(currentPostAtom);
  const isCurrent = currentPost?.title === post.title;

  const onClick = () => {
    setCurrentPost(post);
  };

  return (
    <Paper
      component="article"
      elevation={isCurrent ? 3 : 0}
      className={`${isCurrent ? "current" : ""}`}
      onClick={onClick}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",

        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: 2,
        },

        "&.current": {
          cursor: "default",
          transform: "scale(1.05)",

          "&:hover": {
            backgroundColor: "#fff",
          },
        },
      }}
    >
      <Stack>
        <Typography variant="body1">{post.title}</Typography>
        <Typography variant="body2" color="gray">
          {post.body.trim().slice(0, 100)}...
        </Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{ fontSize: 14 }}
        justifyContent="flex-end"
      >
        <Stack direction="row" alignItems="center" sx={{ color: "#CA8A04" }}>
          <ThumbUpIcon fontSize="inherit" />
          <Typography fontSize="inherit">{post.score}</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" sx={{ color: "#2563EB" }}>
          <EmojiEventsIcon fontSize="inherit" />
          <Typography fontSize="inherit">{post.awardsCount}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default PostListItem;
