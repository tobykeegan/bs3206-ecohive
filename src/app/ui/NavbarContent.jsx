import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { metadata } from '../global.vars';
import { Button, Card, NavItem } from 'react-bootstrap';
import UserProfile from './UserProfile';
import { signOut, useSession } from 'next-auth/react';
import { IoMdSettings } from 'react-icons/io';
import { PiSignOut } from 'react-icons/pi';
import { useRouter } from 'next/navigation';

/**
 * The side bar that pops out of the screen when the
 * Navbar is collapsed.
 * @prop setVisible - toggle the visibility of the NavbarContent
 * @author Toby Keegan
 * @author Alec Painter - Modified to add icons & user session information
 */
export function NavbarContent({ ...props }) {
  const router = useRouter();
  /**
   * Protect client route if unauthenticated & get session
   * @author Alec Painter
   */
  const { data: session } = useSession();
  if (!session || !session.user) {
    router.push('/api/auth/signin');
  }

  return (
    <Navbar.Offcanvas show={props.visible} id="NavbarContent" placement="start">
      <Offcanvas.Header>
        <div className="vertical-align">
          <Offcanvas.Title>
            <div>
              {metadata.title}
              <Button
                className="btn-close"
                onClick={() => props.setVisible(false)}
                aria-label="Close the sidebar"
              ></Button>
            </div>
          </Offcanvas.Title>
        </div>
      </Offcanvas.Header>
      <Offcanvas.Body className="align-items-center">
        <Nav className="justify-content-start flex-grow-1 pe-3">
          <NavItem>
            {/* Only render the user profile in the NavbarContent */}
            {props.visible ? <UserProfile session={session} /> : <></>}
          </NavItem>
          <NavDropdown title="Events">
            <NavDropdown.Item href="/events/discover">
              Discover Events
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/events/discover?attending=yes">
              Upcoming Events
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              href={`/events/discover?creator=${session.user.id}`}
            >
              My Events
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#action2">My Impact</Nav.Link>
        </Nav>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          {props.visible ? (
            <NavDropdown title="My Account">
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={signOut}>Sign out</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav>
              <Nav.Link href="/settings" title="Settings icon">
                <IoMdSettings size={25} />
              </Nav.Link>
              <Nav.Link
                title="Sign out icon"
                id="sign-out-button"
                onClick={signOut}
              >
                <PiSignOut size={25} />
              </Nav.Link>
            </Nav>
          )}
        </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  );
}
