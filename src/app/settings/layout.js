import { Inter } from "next/font/google";
import globals from "../global.vars";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: globals.metadata.title,
	description: globals.metadata.tagline,
};

export default function SettingsLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta
					name="viewport"
					content="initial-scale=1, width=device-width"
				/>
			</head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
