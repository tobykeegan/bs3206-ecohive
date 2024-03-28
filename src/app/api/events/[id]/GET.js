import Event from '@/models/event';
import { NextResponse } from 'next/server';

/**
 * Handles the GET request for retrieving an event by ID.
 * @param {Object} request - The request object.
 * @param {Object} params - The parameters object containing the event ID.
 * @returns {Event} - The event matching an ID, or a suitable error if not found.
 *
 * @author Toby Keegan
 */

export default async function get_by_id(request, { params }) {
  const eventId = params.id;
  console.log('Event ID:', eventId);
  let event;
  try {
    event = await Event.findOne({ _id: eventId });
  } catch (err) {
    return NextResponse.json(
      {
        message: 'Error finding event',
        error: err,
      },
      {
        status: 500,
      },
    );
  }

  if (!event) {
    return NextResponse.json(
      {
        message: 'No event found matching:',
        search: { _id: eventId },
      },
      {
        status: 404,
      },
    );
  }
  return NextResponse.json(event);
}
