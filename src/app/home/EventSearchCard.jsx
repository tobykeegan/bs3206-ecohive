import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import FormControl from '@mui/joy/FormControl';
import Autocomplete from '@mui/joy/Autocomplete';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import { BiSearchAlt } from 'react-icons/bi';
import { CiSquarePlus } from 'react-icons/ci';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { SlLocationPin } from 'react-icons/sl';
import { GoTag } from 'react-icons/go';
import { getTodaysDate } from '@/app/utils/date';
import styles from '@/styles/home';

/**
 * The card for the Home page that lets the user search for events.
 * @author Jade Carino
 */
export default function EventSearchCard() {
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
                <Autocomplete
                  options={[
                    'Demonstration',
                    'Meet Up',
                    'Clean Up',
                    'Education',
                  ]}
                  className="search-input"
                  name="type"
                  placeholder="Demonstration, Meet Up"
                  size="sm"
                  startDecorator={<CiSquarePlus />}
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
                Attendee Limit
              </Typography>
            </Col>
            <Col md={8}>
              <FormControl>
                <Input
                  className="search-input"
                  name="attendees"
                  type="number"
                  placeholder="50"
                  variant="outlined"
                  size="sm"
                  startDecorator={<CiSquarePlus />}
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
          <Row
            className="justify-content-between"
            xs={1}
            md={2}
            style={{ rowGap: '4px' }}
          >
            <Col md={4}>
              <Typography className="search-label" level="body-md">
                Tags
              </Typography>
            </Col>
            <Col md={8}>
              <FormControl>
                <Input
                  className="search-input"
                  name="tags"
                  type="text"
                  placeholder="winchester"
                  variant="outlined"
                  size="sm"
                  startDecorator={<GoTag />}
                />
              </FormControl>
            </Col>
          </Row>
        </form>

        <Button
          id="Search-Button"
          endDecorator={<BiSearchAlt />}
          size="md"
          sx={{ alignSelf: 'end' }}
        >
          Search
        </Button>
      </div>
    </Card>
  );
}

const today = new Date();
const formattedDate = getTodaysDate(today);
