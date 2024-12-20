import { PostCard, PostCardSkeleton } from "@/components/post-card.tsx";
import { PostView } from "@/components/post-view.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import type { Post } from "@/typings/subreddit.ts";
import { findFirst } from "effect/Array";
import { match } from "effect/Option";
import { useRef } from "react";

type SubredditContentProps = {
	posts: Post[];
	activePostId: Post["id"] | null;
	setActivePostId: (id: Post["id"] | null) => void;
	isListOpened: boolean;
};
export function SubredditContent({
	posts,
	activePostId,
	setActivePostId,
	isListOpened,
}: SubredditContentProps) {
	const activePost = findFirst(posts, (post) => post.id === activePostId);

	const articleRef = useRef<HTMLDivElement | null>(null);

	function handleClick(post: Post) {
		setActivePostId(post.id);
		if (articleRef.current) {
			window.scrollTo({
				top: articleRef.current?.offsetTop - 160,
				behavior: "smooth",
			});
		}
	}

	return (
		<div className="flex flex-row mt-4">
			<div className="sticky top-40 shrink-0 max-h-[80vh]">
				<ScrollArea
					className={`max-w-xs ${isListOpened ? "" : "hidden"} h-[80vh] mr-4`}
				>
					<ul className="flex flex-col space-y-4">
						{posts.map((post) => {
							const isActive = post.id === activePostId;

							return (
								<li key={post.id}>
									<PostCard
										post={post}
										isActive={isActive}
										onClick={() => handleClick(post)}
									/>
								</li>
							);
						})}
					</ul>
				</ScrollArea>
			</div>

			{match(activePost, {
				onSome: (post) => <PostView post={post} ref={articleRef} />,
				onNone: () => null,
			})}
		</div>
	);
}

export function Fallback() {
	return (
		<div className="flex flex-row mt-4 min-h-0 h-full">
			<ScrollArea className="max-w-xs grow">
				<ul className="flex flex-col space-y-4">
					<li>
						<PostCardSkeleton />
					</li>
					<li>
						<PostCardSkeleton />
					</li>
					<li>
						<PostCardSkeleton />
					</li>
					<li>
						<PostCardSkeleton />
					</li>
					<li>
						<PostCardSkeleton />
					</li>
					<li>
						<PostCardSkeleton />
					</li>
					<li>
						<PostCardSkeleton />
					</li>
				</ul>
			</ScrollArea>
		</div>
	);
}
