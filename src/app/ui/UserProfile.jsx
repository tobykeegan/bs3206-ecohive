import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { Skeleton } from "@mui/joy";

import style from "../styles/user.profile.card.scss";

// TODO: Implement
const getUsername = () => {
	return null;
};

// TODO: Implement
const getLocation = () => {
	return null;
};

export default function UserProfile() {
	return (
		<Card
			id="userProfile"
			variant="soft"
			size="lg"
			orientation="horizontal"
		>
			<AspectRatio ratio="1" sx={{ width: 90 }}>
				<img
					src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
					srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
					loading="lazy"
					alt=""
				/>
			</AspectRatio>
			<CardContent>
				<Typography level="title-lg" id="card-description">
					{getUsername() || "Carlos "}
				</Typography>
				<Typography
					level="body-sm"
					aria-describedby="card-description"
					mb={1}
				>
					<Link
						overlay
						underline="none"
						href="#interactive-card"
						sx={{ color: "text.tertiary" }}
					>
						{getLocation() || "Winchester, UK"}
					</Link>
				</Typography>
			</CardContent>
		</Card>
	);
}
