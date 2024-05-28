import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { cn } from "@/lib/utils.ts";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import type { Post } from "../typings/subreddit.ts";

type PostCardProps = {
	post: Post;
	isActive?: boolean;
	onClick: () => void;
};
export function PostCard({ post, isActive, onClick }: PostCardProps) {
	return (
		<button
			type="button"
			className="text-pretty text-start w-full"
			onClick={onClick}
		>
			<Card
				className={cn(
					"hover:shadow-lg cursor-pointer transition-all duration-100",
					{
						"border border-slate-500 shadow-lg": isActive,
					},
				)}
			>
				<CardHeader>
					<CardTitle>{post.title}</CardTitle>
					<CardDescription className="ml-auto mt-2 text-sm text-orange-500 font-medium tabular-nums flex items-center">
						<ArrowUpIcon className="inline w-4 h-4 mr-1" />
						<span>{post.score}</span>
					</CardDescription>
				</CardHeader>
			</Card>
		</button>
	);
}

export function PostCardSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Skeleton className="h-6 w-full" />
				</CardTitle>
				<CardDescription className="mt-2">
					<Skeleton className="h-5 w-[60px] ml-auto" />
				</CardDescription>
			</CardHeader>
		</Card>
	);
}
