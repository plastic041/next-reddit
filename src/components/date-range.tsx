import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { Link, useSearch } from "@tanstack/react-router";
import { DateRangeValue, subredditRoute } from "../routes/layout.subreddit.tsx";

const DATES_RANGES: readonly { label: string; value: DateRangeValue }[] = [
  { label: "Past 24 hours", value: "day" },
  { label: "Past week", value: "week" },
  { label: "Past month", value: "month" },
  { label: "Past year", value: "year" },
  { label: "All time", value: "all" },
] as const;

export function DateRange() {
  const { t } = useSearch({
    from: subredditRoute.id,
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
