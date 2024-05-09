import { NextResponse } from 'next/server';
import { HTTP } from '@/utils/globals';
import Attendance from '@/models/attendance';

/**
 * GET attendence information from the database. If no URL query
 * parameters are provided, all attendance records will be returned.
 * If a user or event query parameter is provided, only attendance
 * records for that user or event will be returned.
 *
 * @author Toby Keegan
 */
export default async function GET(req) {
  // get any URL query params
  const urlSearchParams = new URLSearchParams(req.nextUrl.searchParams);
  const params = Object.fromEntries(urlSearchParams.entries());

  let query;
  let attendanceResult;
  // get all the keys from params
  const keys = Object.keys(params);

  try {
    if (keys.includes('event') && keys.includes('user')) {
      // if both event and user are provided, return the attendance record for that user at that event
      // console.log('Getting attendance record for user at event');
      query = { user: params.user, event: params.event };
      attendanceResult = await Attendance.findOne(query);
    } else {
      switch (keys[0]) {
        case 'event':
          console.log('Getting all users attending an event');
          query = { event: params.event };
          attendanceResult = await Attendance.find(query).select('user').exec();
          break;
        case 'user':
          console.log('Getting all events a user has attended');
          query = { user: params.user };
          attendanceResult = await Attendance.find(query)
            .populate('event')
            .select('event')
            .sort({ date: 1 }) // nice to have the most recent event first
            .exec();

          // extract the event data from the populated field
          attendanceResult = attendanceResult.map((event) => event.event);

          break;
        default:
          console.log('Getting all attendance records');
          attendanceResult = await Attendance.find();
      }
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: 'Error finding attendance record',
        error: err,
      },
      {
        status: HTTP.BAD_REQUEST,
      },
    );
  }

  if (!attendanceResult) {
    return NextResponse.json(
      {
        message: 'No attendance records found',
      },
      {
        status: HTTP.NOT_FOUND,
      },
    );
  }

  // Return the event if found
  return NextResponse.json(attendanceResult);
}
