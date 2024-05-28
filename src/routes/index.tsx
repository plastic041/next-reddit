import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "../components/ui/button.tsx";

const SUBREDDITS = [
	{ name: "Short Scary Stories", id: "shortscarystories" },
	{ name: "No Sleep", id: "nosleep" },
	{ name: "Two Sentence Horror", id: "twosentencehorror" },
] as const;

function Subreddits() {
	return (
		<div className="">
			<h4 className="text-lg font-semibold">Subreddits</h4>
			<ul className="flex flex-col">
				{SUBREDDITS.map(({ name, id }) => (
					<li key={id}>
						<Button asChild variant="link">
							<Link
								to="/r/$subreddit"
								params={{
									subreddit: id,
								}}
								search={{
									t: "week",
								}}
							>
								{name}
							</Link>
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
}

export const Route = createFileRoute("/")({
	component: Subreddits,
});
