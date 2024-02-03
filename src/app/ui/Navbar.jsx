"use client";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import { IoMdSearch } from "react-icons/io";
import { metadata } from "../global.vars";
import { Sidebar } from "./Sidebar";
import { useState, useCallback } from "react";
import Tooltip from "@mui/joy/Tooltip";

// this is needed to tell the sass compiler where to look
import styles from "../styles/navbar.scss";

/**
 * The primary navbar component to be shared across all pages of
 * the website.
 * @author Toby Keegan
 */
function MainNavbar() {
	const [showSidebar, setShowSidebar] = useState(false);

	const toggleSidebar = useCallback(
		(value) => {
			setShowSidebar(value);
		},
		[setShowSidebar],
	);

	return (
		<Navbar expand="md" className="mb-3" bg="primary">
			<Container fluid>
				<Navbar.Brand href="/">{metadata.title} 🐝</Navbar.Brand>

				<Sidebar visible={showSidebar} setVisible={toggleSidebar} />
				<Form className="d-flex">
					<Form.Control
						type="search"
						placeholder="Search"
						className="me-2"
						aria-label="Search"
					/>
					<ButtonGroup>
						<Tooltip
							className="btnTooltip"
							title="Search events"
							variant="soft"
						>
							<Button variant="outline-success">
								<IoMdSearch />
							</Button>
						</Tooltip>
						<Tooltip
							className="btnTooltip"
							title="Create Event"
							variant="soft"
						>
							<Button variant="outline-success">+</Button>
						</Tooltip>
					</ButtonGroup>
				</Form>
				<Navbar.Toggle
					className="justify-content-right"
					onClick={() => setShowSidebar(true)}
				/>
			</Container>
		</Navbar>
	);
}

export default MainNavbar;
