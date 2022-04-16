import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Paper from "@mui/material/Paper";
import type { Post } from "../typings/post";
import Stack from "@mui/material/Stack";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Typography from "@mui/material/Typography";
import { currentPostAtom } from "../stores/post";
import { useAtom } from "jotai";

const PostListItem = ({ post }: { post: Post }) => {
  const [currentPost, setCurrentPost] = useAtom(currentPostAtom);
  const isCurrent = currentPost?.title === post.title;

  const onClick = () => {
    setCurrentPost(post);
  };

  return (
    <Paper
      component="article"
      elevation={isCurrent ? 2 : 0}
      onClick={onClick}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
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
