import ButtonGroup from "@mui/material/ButtonGroup";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Post } from "~/typings/post";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

const IconButtons = ({ post }: { post: Post }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { link } = post;

  return (
    <ButtonGroup>
      <Tooltip title="Open in new tab">
        <IconButton
          size="small"
          component="a"
          href={`https://reddit.com${link}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <OpenInNewIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>

      <Tooltip title={isCopied ? "Copied" : "Copy link to clipboard"}>
        <IconButton
          size="small"
          onClick={() => {
            // copy to clipboard using navigator.clipboard
            const text = `https://reddit.com${link}`;
            navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => {
              setIsCopied(false);
            }, 1000);
          }}
        >
          <ContentCopyIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
};

export default IconButtons;
