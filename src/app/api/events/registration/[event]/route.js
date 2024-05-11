import Attendance from '@/models/attendance';
import { NextResponse } from 'next/server';

/**
 * return some information about the event
 * sign ups and capacity
 */
export async function GET(request, { params }) {
  //   console.log('Event ID is ', params);
  // count the documents in the attendance collection
  const attendance = await Attendance.find({ event: params.event });

  return NextResponse.json({
    signups: attendance.length,
  });
}
