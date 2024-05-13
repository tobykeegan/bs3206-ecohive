'use client';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { IoMdSearch } from 'react-icons/io';
import { metadata } from '../global.vars';
import { NavbarContent } from './NavbarContent';
import { useState, useCallback } from 'react';
import Tooltip from '@mui/joy/Tooltip';
import { useRouter } from 'next/navigation';
import { FormControl, Input } from '@mui/joy';
import axios from 'axios';

// this is needed to tell the sass compiler where to look
import styles from '@/styles/navbar';

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

  const router = useRouter();

  return (
    <Navbar aria-label="Navbar" expand="md" className="mb-3" bg="primary">
      <Container fluid>
        <Navbar.Brand href="/">{metadata.title}</Navbar.Brand>

        <NavbarContent
          visible={showNavbarContent}
          setVisible={toggleNavbarContent}
        />
        <form
          id="globalSearch"
          className="d-flex"
          onSubmit={(event) => {
            console.log('Searching for an event by keyword in the title');
            event.preventDefault();
            const formData = new FormData(event.target);
            const form = Object.fromEntries(formData.entries());
            console.log(form);

            axios
              .post(`/api/events`, {
                ...form,
              })
              .then((res) => {
                if (res.status === 200) {
                  console.log('Search for events was successful');
                  console.log('Response: ', res.data);
                  const queryParams = Object.keys(form)
                    .map(
                      (key) =>
                        `${encodeURIComponent(key)}=${encodeURIComponent(form[key])}`,
                    )
                    .join('&');
                  router.push(`/events/discover?${queryParams}`);
                }
              })
              .catch((error) => {
                console.log('There was an error during the search:', error);
                if (error.response.status === 404) {
                  console.log('Search did not find any events by the keyword');
                  router.push(`/events/discover?keyword=notfound`);
                }
              });
          }}
        >
          <FormControl>
            <Input
              placeholder="Search"
              className="me-2"
              aria-label="Search for events"
              id="keyword-field"
              name="keyword"
            />
          </FormControl>
          <ButtonGroup>
            <Tooltip
              className="btnTooltip"
              title="Search events"
              variant="soft"
            >
              <Button variant="outline-success" type="submit">
                <IoMdSearch />
              </Button>
            </Tooltip>
            <Tooltip className="btnTooltip" title="Create Event" variant="soft">
              <Button
                onClick={() => router.push('/events/create')}
                variant="outline-success"
              >
                +
              </Button>
            </Tooltip>
          </ButtonGroup>
        </form>
        <Navbar.Toggle
          className="justify-content-right"
          onClick={() => setShowNavbarContent(true)}
        />
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
