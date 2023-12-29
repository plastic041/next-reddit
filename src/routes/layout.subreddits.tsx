import { Link, Route } from "@tanstack/react-router";
import { Button } from "../components/ui/button.tsx";
import { rootRoute } from "../router.tsx";

const SUBREDDITS = [
  { name: "Short Scary Stories", id: "shortscarystories" },
  { name: "No Sleep", id: "nosleep" },
  { name: "Two Sentence Horror", id: "twosentencehorror" },
] as const;

export function Subreddits() {
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

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Subreddits,
});
