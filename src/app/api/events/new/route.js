import Event from '@/models/event';
import { NextResponse } from 'next/server';
import { HTTP } from '@/utils/globals';

/**
 * Creates a new event in the database
 * @author Toby Keegan
 */

export async function POST(request) {
  let fields;
  try {
    fields = await request.json();
  } catch (err) {
    return NextResponse.json(
      {
        message: 'Bad JSON body provided',
      },
      {
        status: HTTP.BAD_REQUEST,
      },
    );
  }

  if (!fields) {
    return NextResponse.json(
      {
        message: 'No fields provided to create an event',
      },
      {
        status: HTTP.BAD_REQUEST,
      },
    );
  }

  try {
    const event = new Event(fields);
    await event.save();

    // Return the event if found
    return NextResponse.json(event, { status: HTTP.CREATED });
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
