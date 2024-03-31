import Event from '@/models/event';
import { NextResponse } from 'next/server';
import logger from '@/utils/logger';

export default async function deleteEvent(id) {
  logger.info('Delete Event: ', id);
  let res = await Event.findByIdAndDelete(id);
  logger.info('Delete Event Result: ', res);
  if (!res) {
    return NextResponse.json(
      {
        message: 'No event found with ID: ' + id,
      },
      {
        status: 404,
      },
    );
  }
  return NextResponse.json(
    {
      id: id,
      message: 'Event deleted successfully',
    },
    {
      status: 200,
    },
  );
}
