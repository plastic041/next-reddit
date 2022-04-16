import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import IconButtons from "./PostHeader/IconButtons";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import type { Post } from "~/typings/post";
import PostInfos from "./PostHeader/PostInfos";
import Stack from "@mui/material/Stack";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Typography from "@mui/material/Typography";

const PostHeader = ({ post }: { post: Post }) => {
  const { title, score, author, createdAt, link } = post;

  const makeDate = () => {
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth() + 1;
    const day = createdAt.getDate();
    return `${year}-${month}-${day}`;
  };

  return (
    <Box>
      <Box component="h1" sx={{ margin: 0 }}>
        <Typography variant="h5" component="span" sx={{ fontWeight: 200 }}>
          u/{author} -{" "}
        </Typography>
        <Typography variant="h5" component="span" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <PostInfos post={post} />
        <IconButtons post={post} />
      </Stack>
    </Box>
  );
};

export default PostHeader;
