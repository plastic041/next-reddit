import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import type { Post } from "~/typings/post";
import Stack from "@mui/material/Stack";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Typography from "@mui/material/Typography";

const PostInfos = ({ post }: { post: Post }) => {
  const { score, createdAt } = post;

  const makeDate = () => {
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth() + 1;
    const day = createdAt.getDate();
    return `${year}-${month}-${day}`;
  };

  return (
    <Stack direction="row" spacing={2}>
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        sx={(theme) => ({ color: theme.palette.info.main })}
      >
        <CalendarTodayIcon color="inherit" fontSize="small" />
        <Typography color="inherit">{makeDate()}</Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="center"
        sx={{ color: "#CA8A04" }}
      >
        <ThumbUpIcon fontSize="small" />
        <Typography>{score}</Typography>
      </Stack>
    </Stack>
  );
};

export default PostInfos;
