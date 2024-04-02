import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import Event from '@/models/event';

/**
 * POST request to /api/events. Retrieves all events from the database
 * that match the search criteria provided in the request body.
 *
 * @param {NextRequest} request - The request object.
 * @returns {Event[]} - The list of all events.
 * @throws {NextResponse} - If no events are found, returns a 404 error.
 *
 *
 * @author Toby Keegan
 */
export default async function POST(request) {
  // parse the body of the request
  let body;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json(
      {
        message:
          'Invalid JSON body. If you want to search for all events, send an empty object: {}',
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
