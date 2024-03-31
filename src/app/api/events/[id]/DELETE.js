import Event from '@/models/event';
import { NextResponse } from 'next/server';
import logger from '@/utils/logger';
import { HTTP } from '@/utils/globals';
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
        status: HTTP.NOT_FOUND,
      },
    );
  }
  return NextResponse.json(
    {
      id: id,
      message: 'Event deleted successfully',
    },
    {
      status: HTTP.OK,
    },
  );
}
