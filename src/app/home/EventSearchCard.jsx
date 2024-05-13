'use client';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { BiSearchAlt } from 'react-icons/bi';
import { CiSquarePlus } from 'react-icons/ci';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { SlLocationPin } from 'react-icons/sl';
import { getTodaysDate } from '@/app/utils/date';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Option, Select } from '@mui/joy';

import styles from '@/styles/home';

function formatDate(dateString) {
  const parts = dateString.split('/');
  const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  return date.toISOString();
}

/**
 * A component for the Home page that a user can search for events
 * by location, event type and date.
 * @returns {JSX.Element} The event search component.
 * @author Jade Carino
 */
export default function EventSearchCard() {
  const router = useRouter();

  return (
    <Card
      id="Event-Search-Card"
      variant="plain"
      size="lg"
      sx={{
        backgroundColor: 'white',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <Typography id="Event-Search-Card-Heading" level="title-lg">
          Find Events
        </Typography>

        <form
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
          onSubmit={(event) => {
            console.log('Searching for events with the search form');
            event.preventDefault();
            const formData = new FormData(event.target);
            const nonNullEntries = Array.from(formData.entries()).filter(
              ([key, value]) => value !== '',
            );
            const form = Object.fromEntries(nonNullEntries);

            if (form.date) {
              form.date = formatDate(form.date);
            }

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
                } else {
                  console.log('Search was not successful: ', res);
                }
              })
              .catch((error) => {
                console.log('There was an error during the search:', error);
                if (error.response.status === 404) {
                  console.log('Search did not find any events by the filter');
                  router.push(`/events/discover?keyword=notfound`);
                }
              });
          }}
        >
          <Row
            className="justify-content-between"
            xs={1}
            md={2}
            style={{ rowGap: '4px' }}
          >
            <Col md={4}>
              <Typography className="search-label" level="body-md">
                Location
              </Typography>
            </Col>
            <Col md={8}>
              <FormControl>
                <Input
                  className="search-input"
                  name="location"
                  type="text"
                  placeholder="Winchester"
                  variant="outlined"
                  size="sm"
                  startDecorator={<SlLocationPin />}
                />
              </FormControl>
            </Col>
          </Row>
          <Row
            className="justify-content-between"
            xs={1}
            md={2}
            style={{ rowGap: '4px' }}
          >
            <Col md={4}>
              <Typography className="search-label" level="body-md">
                Event Type
              </Typography>
            </Col>
            <Col md={8}>
              <FormControl>
                <Select
                  className="search-input"
                  name="type"
                  placeholder="Demonstration, Meet up"
                  size="sm"
                  startDecorator={<CiSquarePlus />}
                  data-testid="event-type"
                >
                  <Option value="demonstration">Demonstration</Option>
                  <Option value="meet-up">Meet up</Option>
                  <Option value="clean-up">Clean up</Option>
                  <Option value="education">Education</Option>
                </Select>
              </FormControl>
            </Col>
          </Row>
          <Row
            className="justify-content-between"
            xs={1}
            md={2}
            style={{ rowGap: '4px' }}
          >
            <Col md={4}>
              <Typography className="search-label" level="body-md">
                Date
              </Typography>
            </Col>
            <Col md={8}>
              <FormControl>
                <Input
                  className="search-input"
                  name="date"
                  type="text"
                  placeholder={formattedDate}
                  variant="outlined"
                  size="sm"
                  startDecorator={<FaRegCalendarAlt />}
                />
              </FormControl>
            </Col>
          </Row>
          <Button
            id="Search-Button"
            endDecorator={<BiSearchAlt />}
            size="md"
            type="submit"
            sx={{ alignSelf: 'end' }}
          >
            Search
          </Button>
        </form>
      </div>
    </Card>
  );
}

const today = new Date();
const formattedDate = getTodaysDate(today);
