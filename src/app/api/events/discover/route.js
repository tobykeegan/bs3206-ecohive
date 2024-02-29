import { NextResponse } from 'next/server';
import Event from '@/models/event';
import { connect } from '@/services/mongoose';

await connect();

/**
 *
 * @param {*} request
 */
export async function GET(request) {
  // Form data will be used to modify the request
  //   const formData = await request.formData();
  // until the form is hooked in, just return all the events

  let eventsList = await Event.find({});

  return NextResponse.json(eventsList);
}

export async function POST(request) {}
