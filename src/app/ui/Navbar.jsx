'use client';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { IoMdSearch } from 'react-icons/io';
import { metadata } from '../global.vars';
import { NavbarContent } from './NavbarContent';
import { useState, useCallback } from 'react';
import Tooltip from '@mui/joy/Tooltip';

// this is needed to tell the sass compiler where to look
import styles from '../styles/navbar.scss';

/**
 * The primary navbar component to be shared across all pages of
 * the website.
 * @author Toby Keegan
 */
function MainNavbar() {
  const [showNavbarContent, setShowNavbarContent] = useState(false);

  const toggleNavbarContent = useCallback(
    (value) => {
      setShowNavbarContent(value);
    },
    [setShowNavbarContent],
  );

  return (
    <Navbar expand="md" className="mb-3" bg="primary">
      <Container fluid>
        <Navbar.Brand href="/">{metadata.title}</Navbar.Brand>

        <NavbarContent
          visible={showNavbarContent}
          setVisible={toggleNavbarContent}
        />
        <Form id="globalSearch" className="d-flex">
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
            <Tooltip className="btnTooltip" title="Create Event" variant="soft">
              <Button variant="outline-success">+</Button>
            </Tooltip>
          </ButtonGroup>
        </Form>
        <Navbar.Toggle
          className="justify-content-right"
          onClick={() => setShowNavbarContent(true)}
        />
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
