import Event from '@/models/event';
import { NextResponse } from 'next/server';

/**
 * GET request to /api/events. Accepts query parameters to search for events.
 * For example, /api/events?id=12345 will search for an event with the ID of 12345.
 * If no events are found, a 404 response is returned.
 *
 * @author Toby Keegan
 */

export default async function GET(request) {
  // search for the event(s) in the database
  let eventsList = await Event.find({});

  if (eventsList.length === 0) {
    return NextResponse.json(
      {
        message: 'No events were found.',
      },
      {
        status: 404,
      },
    );
  }
  return NextResponse.json(eventsList);
}
