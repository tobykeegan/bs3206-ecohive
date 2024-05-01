import Event from '@/models/event';
import Attendance from '@/models/attendance';
import { NextResponse } from 'next/server';
import logger from '@/utils/logger';
import { HTTP } from '@/utils/globals';

/**
 * Delete an event in the database by ID
 *
 * @param {string} id - the ID of the event to delete
 * @author Toby Keegan
 */
export default async function deleteEvent(id) {
  let res = await Event.findByIdAndDelete(id);
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
  // delete all attendance records for this event
  const records = await Attendance.deleteMany({ event: id });
  return NextResponse.json(
    {
      id: id,
      message: 'Event deleted successfully',
      attendanceRecords: {
        deleted: records.deletedCount,
      },
    },
    {
      status: HTTP.OK,
    },
  );
}
