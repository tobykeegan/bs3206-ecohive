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

  let eventsList = await Event.apiQuery(request.search).exec();

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
