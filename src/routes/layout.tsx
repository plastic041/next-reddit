import { Outlet } from "@tanstack/react-router";
import { Devtools } from "../components/devtools.tsx";

export function Layout() {
	return (
		<div className="container mx-auto py-8 xl:px-40 h-screen flex flex-col">
			<Outlet />
			<Devtools />
		</div>
	);
}
