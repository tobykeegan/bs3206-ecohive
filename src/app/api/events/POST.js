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
 * @author Toby Keegan, Jade Carino
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
  let eventsList;

  if (body.capacity) {
    // Do a fuzzy search for the capacity and exact search for everything else
    let capacity = parseInt(body.capacity);
    let minCapacity = capacity - capacity * 0.1; // Min capacity of 10% less than what was searched
    let maxCapacity = capacity + capacity * 0.1; // Max capacity of 10% more than what was searched
    // Remove capacity from the rest of the search body
    delete body.capacity;

    eventsList = await Event.find(
      { 'attendance.capacity': { $lte: maxCapacity, $gte: minCapacity } },
      body,
    );
  } else if (body.keyword) {
    // If searching by keyword from the NavBar
    eventsList = await Event.find({
      name: { $regex: body.keyword, $options: 'i' },
    }); // Case insensitive search for the keyword
  } else {
    eventsList = await Event.find(body);
  }

  if (eventsList.length > 0) {
    return NextResponse.json(eventsList);
  } else {
    return NextResponse.json(
      {
        message: 'No events found matching:',
        search: body,
      },
      {
        status: 404,
      },
    );
  }
}
