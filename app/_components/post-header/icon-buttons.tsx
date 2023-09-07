import { useState } from "react";
import {
  CheckIcon,
  OpenInNewWindowIcon,
  ClipboardCopyIcon,
} from "@radix-ui/react-icons";

import { Post } from "~/_typings/post";
import { Flex, Tooltip, IconButton } from "@radix-ui/themes";

const IconButtons = ({ post }: { post: Post }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { link } = post;

  return (
    <Flex p="2" gap="4">
      <Tooltip content="Open in new tab">
        <IconButton size="2" asChild variant="ghost">
          <a
            href={`https://reddit.com${link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <OpenInNewWindowIcon />
          </a>
        </IconButton>
      </Tooltip>

      <Tooltip content={isCopied ? "Copied" : "Copy link to clipboard"}>
        <IconButton
          size="2"
          variant="ghost"
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
          {isCopied ? <CheckIcon /> : <ClipboardCopyIcon />}
        </IconButton>
      </Tooltip>
    </Flex>
  );
};

export default IconButtons;
