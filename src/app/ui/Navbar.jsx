import Grid from "@mui/joy/Grid";
import globals from "../global.vars";
export default function Navbar() {
	return (
		<nav id="navbar">
			<h1>{globals.metadata.title}</h1>
			<a href="/">Home</a>
			<a href="/settings">Settings</a>
			<a href="/events/feed">Events</a>
			<a href="/events/feed">My Events</a>
		</nav>
	);
}
