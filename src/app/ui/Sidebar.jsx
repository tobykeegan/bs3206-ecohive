"use client";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { metadata } from "../global.vars";
import { Button, Card } from "react-bootstrap";
import UserProfile from "./UserProfile";

/**
 * The side bar that pops out of the screen when the
 * Navbar is collapsed.
 * @prop setVisible - toggle the visibility of the sidebar
 * @author Toby Keegan
 */
export function Sidebar({ ...props }) {
	return (
		<Navbar.Offcanvas show={props.visible} id="sidebar" placement="start">
			<Offcanvas.Header>
				<div className="vertical-align">
					<Offcanvas.Title>
						<div>
							{metadata.title}
							<Button
								className="btn-close"
								onClick={() => props.setVisible(false)}
								aria-label="Close"
							></Button>
						</div>
					</Offcanvas.Title>
					<UserProfile />
				</div>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Nav className="justify-content-start flex-grow-1 pe-3">
					<NavDropdown title="Events">
						<NavDropdown.Item href="/events/feed">
							Discover Events
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="/events/myevents/upcoming">
							My Upcoming Events
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="/events/myevents/history">
							My Past Events
						</NavDropdown.Item>
					</NavDropdown>
					<Nav.Link href="#action2">My Impact</Nav.Link>
				</Nav>
				<Nav className="justify-content-end flex-grow-1 pe-3">
					<NavDropdown title="My Account">
						<NavDropdown.Item href="/settings">
							Settings
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#signout">
							Sign out
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Offcanvas.Body>
		</Navbar.Offcanvas>
	);
}
