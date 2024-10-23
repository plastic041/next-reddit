import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Devtools } from "../components/devtools.tsx";

export const Route = createRootRoute({
	component: () => (
		<>
			<Outlet />
			<Devtools />
		</>
	),
});
