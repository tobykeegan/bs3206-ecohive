import { NextResponse } from 'next/server';
import { connect } from '../services/mongoose.service';

connect();

export async function GET(request) {}

export async function POST(request) {
  // let event = new Event(request.body)
  // await event.save();
}

const generateOneEvent = async () => {
  let event = new Event({
    name: 'Event name',
    type: 'Event type',
    location: 'Event Location',
    date: '01/01/1970',
    description:
      'This is an event description.\
        It has a considerable amount of information about the event.',
    attendance: {
      capacity: 3000,
      signups: 1300,
    },
    photoUrl: '',
    points: 100,
    tags: [
      {
        name: 'Winchester',
        colour: 'purple',
      },
      {
        name: 'Trees',
        colour: 'green',
      },
    ],
  });
  await event.save();
};
