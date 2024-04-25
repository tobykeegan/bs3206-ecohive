import Event from '@/models/event';
import { NextResponse } from 'next/server';

/**
 * GET request to /api/events. Retrieves all events from the database.
 * If you want to filter events, you must instead issue a POST request with
 * a JSON body containing the filter criteria.
 *
 * @param {Object} request - The request object.
 * @returns {Event[]} - The list of all events.
 * @throws {NextResponse} - If no events are found, returns a 404 error.
 *
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
