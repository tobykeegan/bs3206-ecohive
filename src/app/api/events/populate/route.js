import Event from '@/models/event';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import { connect } from '@/services/mongoose';
import { generateEvent, randomString } from '@/test/utils';
require('dotenv').config();

await connect();

/**
 * Development utility that will regenerate some events in the database.
 *
 * @author Toby Keegan
 */

export async function POST(request) {
  const oldCount = await Event.countDocuments();

  // get all the owners from the User model
  const owners = await User.find({});
  // Generate a random number of events with no owner
  const numEvents = Math.floor(Math.random() * 10) + 1;

  for (let i = 0; i < numEvents; i++) {
    const event = generateEvent();
    event.name = `Events API Test Event #${i + 1}`;
    event.description = `Event #${i + 1} generated by /api/events/populate`;
    // give the event a random owner from owners
    event.owner = owners[Math.floor(Math.random() * owners.length)].id;
    await event.save();
  }

  const newCount = await Event.countDocuments();

  return NextResponse.json(
    {
      message: 'Events repopulated',
      documents: {
        before: oldCount,
        after: newCount,
      },
    },
    {
      status: 200,
    },
  );
}
