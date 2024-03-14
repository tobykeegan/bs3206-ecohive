import { NextResponse } from 'next/server';
import Event from '@/models/event';
import { connect } from '@/services/mongoose';

await connect();

/**
 *
 * @param {*} request
 */
export async function GET(request) {
  let searchObject = {};
  let url = new URL(request.url);
  // iterate through the search parameters and add them to the search object
  for (let [key, value] of url.searchParams) {
    if (key === 'id') {
      key = '_id';
      searchObject[key] = value;
    }
  }
  let eventsList = await Event.find(searchObject).exec();

  if (eventsList.length === 0) {
    // return status 404 if no events are found
    return NextResponse.json(
      {
        message: 'No events found matching:',
        search: searchObject,
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json(eventsList);
}

export async function POST(request) {}
