import { NextResponse } from 'next/server';
import Event from '@/models/event';

export default async function POST(request) {
  // parse the body of the request
  let body;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json(
      {
        message: 'Invalid JSON body. Please provide a valid JSON object.',
        error: err,
      },
      {
        status: 400,
      },
    );
  }

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
