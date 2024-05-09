import { NextResponse } from 'next/server';
import { HTTP } from '@/utils/globals';
import Attendance from '@/models/attendance';

/**
 * Delete an attendance record
 */
export default async function DELETE(request) {
  // get any URL query params
  const urlSearchParams = new URLSearchParams(request.nextUrl.searchParams);
  const params = Object.fromEntries(urlSearchParams.entries());

  const { event, user } = params;
  try {
    const attendance = await Attendance.findOneAndDelete({ event, user });

    if (!attendance) {
      return NextResponse.json(
        {
          message: 'No attendance record found',
        },
        {
          status: HTTP.NOT_FOUND,
        },
      );
    }

    return NextResponse.json(attendance);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: 'Error deleting attendance record',
        error: err,
      },
      {
        status: HTTP.BAD_REQUEST,
      },
    );
  }
}
