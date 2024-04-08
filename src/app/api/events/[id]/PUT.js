import Event from '@/models/event';
import { NextResponse } from 'next/server';
import { HTTP } from '@/utils/globals';
/**
 * Handles the PUT request for retrieving an event by ID.
 * @param {Object} request - The request object.
 * @param {Object} params - The parameters object containing the event ID.
 * @returns {Event} - The event matching an ID, or a suitable error if not found.
 *
 * @author Toby Keegan
 */

export default async function putById(id) {
  let fields;
  let event;

  fields = await request.json();

  if (!fields) {
    return NextResponse.json(
      {
        message: 'No fields provided to update',
      },
      {
        status: HTTP.BAD_REQUEST,
      },
    );
  }

  try {
    event = await Event.findOneAndUpdate({ _id: id }, fields, { new: true });
    if (!event) {
      return NextResponse.json(
        {
          message: 'No event found matching:',
          search: { _id: id },
        },
        {
          status: HTTP.NOT_FOUND,
        },
      );
    }
    // Return the event if found
    return NextResponse.json(event);
  } catch (err) {
    return NextResponse.json(
      {
        message: 'Error finding event',
        error: err,
      },
      {
        status: HTTP.BAD_REQUEST,
      },
    );
  }
}
