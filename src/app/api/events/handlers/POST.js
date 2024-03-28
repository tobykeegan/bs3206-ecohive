import Event from '@/models/event';
import { NextResponse } from 'next/server';
export async function post_handler(request) {
  // parse the body of the request
  let body = await request.json();
  console.log(body);
  // search for the event(s) in the database
  let eventsList = await Event.find(body);

  switch (eventsList.length) {
    // No events were found, so return 404
    case 0:
      return NextResponse.json(
        {
          message: 'No events found matching:',
          search: body,
        },
        {
          status: 404,
        },
      );

    // A single event matched, so return it
    case 1:
      return NextResponse.json(eventsList[0]);

    // More than one event matched, so return them all
    default:
      return NextResponse.json(eventsList);
  }
}
