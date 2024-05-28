import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { Link, useSearch } from "@tanstack/react-router";
import { type Output, fallback, picklist } from "valibot";
import { Route } from "../routes/r/$subreddit.tsx";

const DATES_RANGES: readonly { label: string; value: DateRangeValue }[] = [
	{ label: "Past 24 hours", value: "day" },
	{ label: "Past week", value: "week" },
	{ label: "Past month", value: "month" },
	{ label: "Past year", value: "year" },
	{ label: "All time", value: "all" },
] as const;

export const DateRangeValueSchema = fallback(
	picklist(["day", "week", "month", "year", "all"]),
	"week",
);

type DateRangeValue = Output<typeof DateRangeValueSchema>;

export function DateRange() {
	const { t } = useSearch({
		from: Route.id,
	});

	return (
		<ToggleGroup type="single" value={t}>
			{DATES_RANGES.map(({ label, value }) => (
				<ToggleGroupItem key={value} value={value} asChild>
					<Link
						search={{
							t: value,
						}}
					>
						{label}
					</Link>
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
