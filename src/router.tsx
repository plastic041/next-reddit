import { RootRoute, Router } from "@tanstack/react-router";
import { subredditRoute } from "./routes/layout.subreddit.tsx";
import { indexRoute } from "./routes/layout.subreddits.tsx";
import { Layout } from "./routes/layout.tsx";

export const rootRoute = new RootRoute({
	component: Layout,
});

export const routeTree = rootRoute.addChildren([indexRoute, subredditRoute]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
