'use client';
import * as React from 'react';
import Card from 'react-bootstrap/Card';
import { ListGroup } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getFormattedDate, getImageSrc } from '@/app/ui/utils';
import { Badge, Stack } from 'react-bootstrap';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
export default function EventWidget({ event }) {
  const openEvent = () => {};

  const router = useRouter();
  return (
    <Card style={{ width: '90vw' }}>
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            <Image
              style={{
                width: '100%',
              }}
              onClick={() => router.push(`/events/discover/${event._id}`)}
              src={getImageSrc(event.photoUrl)}
              width={250}
              height={150}
              alt="Picture of the event"
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <Stack direction="horizontal" gap={3}>
              <Badge className="eventChip" id="location-chip" pill>
                <PlaceIcon />
                {event.location}
              </Badge>
              <Badge className="eventChip" id="date-chip" pill>
                <CalendarMonthOutlinedIcon />
                {getFormattedDate(event.date)}
              </Badge>
            </Stack>
          </ListGroup.Item>
          <ListGroup.Item>{event.description}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
  // return (
  //   <Card
  //     variant="outlined"
  //     sx={{
  //       minWidth: 300,
  //     }}
  //   >
  //     <CardContent
  //       orientation="horizontal"
  //       sx={{ alignItems: 'center', gap: 1 }}
  //     >
  //       <Typography fontWeight="lg">{event.name}</Typography>
  //     </CardContent>
  //     <CardOverflow>
  //       <AspectRatio>
  //         <Image
  //           onClick={() => router.push(`/events/discover/${event._id}`)}
  //           src={getImageSrc(event.photoUrl)}
  //           width={500}
  //           height={500}
  //           alt="Picture of the event"
  //         />
  //       </AspectRatio>
  //     </CardOverflow>
  //     <CardContent
  //       orientation="horizontal"
  //       sx={{ alignItems: 'center', mx: -1 }}
  //     >
  //       <Stack gap={3} direction="horizontal">
  //         <Badge className="eventChip" id="location-chip" pill>
  //           <PlaceIcon />
  //           {event.location}
  //         </Badge>
  //         <Badge className="eventChip" id="date-chip" pill>
  //           <CalendarMonthOutlinedIcon />
  //           {getFormattedDate(event.date)}
  //         </Badge>
  //       </Stack>
  //     </CardContent>
  //     <CardContent>
  //       <Link
  //         component="button"
  //         underline="none"
  //         fontSize="10px"
  //         sx={{ color: 'text.tertiary', my: 0.5 }}
  //       ></Link>
  //       <Typography fontSize="sm">
  //         <Link
  //           component="button"
  //           color="neutral"
  //           fontWeight="lg"
  //           textColor="text.primary"
  //         ></Link>{' '}
  //         {event.description}
  //       </Typography>
  //     </CardContent>
}
