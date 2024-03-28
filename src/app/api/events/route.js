import { NextResponse } from 'next/server';
import Event from '@/models/event';
import { connect } from '@/services/mongoose';

await connect();

/**
 *
 * @param {*} request
 */
export async function GET(request) {
  // create an empty object to store the search parameters
  let searchObject = {};

  // create a new URL object from the request URL
  let url = new URL(request.url);

  // iterate through the search parameters and add them to the search object
  for (let [key, value] of url.searchParams) {
    if (key === 'id') {
      // if the key is 'id', set the key to '_id' to match the MongoDB schema
      key = '_id';
      searchObject[key] = value;
    }
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
