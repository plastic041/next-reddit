import { Button } from "@/components/ui/button.tsx";
import { Typography } from "@/components/ui/typography.tsx";
import {
	CheckIcon,
	ClipboardCopyIcon,
	OpenInNewWindowIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import Markdown from "react-markdown";
import type { Post } from "../typings/subreddit.ts";

type CopyLinkButtonProps = {
	url: string;
};
function CopyLinkButton({ url }: CopyLinkButtonProps) {
	const [copied, setCopied] = useState(false);

	return (
		<Button
			size="icon"
			variant="ghost"
			onClick={() => {
				navigator.clipboard.writeText(url);
				setCopied(true);
				setTimeout(() => {
					setCopied(false);
				}, 2000);
			}}
		>
			{copied ? <CheckIcon /> : <ClipboardCopyIcon />}
		</Button>
	);
}

type PostViewProps = {
	post: Post;
	ref: React.Ref<HTMLDivElement>;
};
export function PostView({ post, ref }: PostViewProps) {
	const createdAt = new Date(post.created_utc * 1000);

	return (
		<article
			className="flex flex-col px-8 py-6 border border-slate-500 mb-4"
			ref={ref}
		>
			<div className="flex flex-row items-end gap-4">
				<div className="flex flex-col grow">
					<p className="text-sm text-muted-foreground">
						u/{post.author} - {createdAt.toLocaleDateString()}
					</p>
					<Typography as="h2">{post.title}</Typography>
				</div>
				<div className="flex flex-row gap-x-2">
					<Button size="icon" variant="link" asChild>
						<a href={post.url} target="_blank" rel="noopener noreferrer">
							<OpenInNewWindowIcon />
						</a>
					</Button>
					<CopyLinkButton url={post.url} />
				</div>
			</div>
			<hr className="my-4" />
			<Markdown
				className="font-[literata]"
				components={{
					p(props) {
						return (
							<Typography as="p" {...props}>
								{/* biome-ignore lint/complexity/noUselessFragments: <explanation> */}
								<>{props.children}</>
							</Typography>
						);
					},
				}}
			>
				{post.selftext.replaceAll("&amp;#x200B;", "")}
			</Markdown>
		</article>
	);
}
