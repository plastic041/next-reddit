import { DateRange, DateRangeValueSchema } from "@/components/date-range.tsx";
import { Fallback } from "@/components/subreddit/content";
import { Toggle } from "@/components/ui/toggle";
import { Typography } from "@/components/ui/typography.tsx";
import type { Post, Subreddit } from "@/typings/subreddit.ts";
import { RowsIcon } from "@radix-ui/react-icons";
import { Await, createFileRoute, defer } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import { object, parse } from "valibot";
import { SubredditContent } from "../../components/subreddit/content";

export function SubredditPage() {
	const { subreddit } = Route.useParams();
	const { postsPromise } = Route.useLoaderData();

	const [activePostId, setActivePostId] = useState<Post["id"] | null>(null);
	const [isListOpened, setListOpened] = useState(true);

	return (
		<div className="grid grid-cols-12 px-2 xl:px-0">
			<header className="col-start-1 xl:col-start-3 col-span-full xl:col-span-8 sticky top-0 pt-8 bg-white z-50 h-36">
				<Typography as="h1">r/{subreddit}</Typography>
				<div className="mt-4 place-self-start flex flex-row">
					<Toggle
						variant="outline"
						className="mr-2"
						onClick={() => setListOpened(!isListOpened)}
						pressed={isListOpened}
					>
						<RowsIcon />
					</Toggle>
					<DateRange />
				</div>
			</header>
			<div className="col-start-1 xl:col-start-3 col-span-full xl:col-span-8">
				<Suspense fallback={<Fallback />}>
					<Await promise={postsPromise}>
						{(posts) => (
							<SubredditContent
								posts={posts}
								activePostId={activePostId}
								setActivePostId={setActivePostId}
								isListOpened={isListOpened}
							/>
						)}
					</Await>
				</Suspense>
			</div>
		</div>
	);
}

const SearchSchema = object({
	t: DateRangeValueSchema,
});

export const Route = createFileRoute("/r/$subreddit")({
	component: SubredditPage,
	validateSearch: (search) => parse(SearchSchema, search),

	loaderDeps: ({ search: { t } }) => ({ t }),
	loader: async ({ params: { subreddit }, deps: { t }, abortController }) => {
		const postsPromise = new Promise<Post[]>((resolve) => {
			const url = new URL(`https://oauth.reddit.com/r/${subreddit}/top.json`);
			url.searchParams.set("t", t);

			fetch(url.toString(), {
				signal: abortController.signal,
			})
				.then((response) => response.json())
				.then((json: Subreddit) => {
					const posts = json.data.children.map(({ data }) => data);
					resolve(posts);
				});
		});

		return {
			postsPromise: defer(postsPromise),
		};
	},

	staleTime: 1000 * 60 * 60, // 1 hour
});
