import { NextResponse } from 'next/server';
import Event from '@/models/event';
import { connect } from '@/services/mongoose';

await connect();

/**
 * GET request to /api/events. Accepts query parameters to search for events.
 * For example, /api/events?id=12345 will search for an event with the ID of 12345.
 * If no events are found, a 404 response is returned.
 *
 * @author Toby Keegan
 */
export async function GET(request) {
  // create an empty object to store the search parameters
  let searchObject = {};

  // create a new URL object from the request URL
  let url = new URL(request.url);

  let id = url.searchParams.get('id');

  if (id) {
    searchObject._id = id;
  }
  // search for the event(s) in the database
  let eventsList = await Event.find(searchObject);

  switch (eventsList.length) {
    // No events were found, so return 404
    case 0:
      return NextResponse.json(
        {
          message: 'No events found matching:',
          search: searchObject,
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
      // if the search object has an _id key, then we should only have one event
      if (searchObject._id) {
        return NextResponse.json(
          {
            message: 'Hmm. Somehow we found more than one event with that ID.',
            search: searchObject,
          },
          {
            status: 500,
          },
        );
      } else {
        return NextResponse.json(eventsList);
      }
  }
}

export async function POST(request) {}
