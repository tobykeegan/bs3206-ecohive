import { NextResponse } from 'next/server';
import { HTTP } from '@/utils/globals';
import Attendance from '@/models/attendance';
import { connect } from '../../services/mongoose.service';
import { useSearchParams } from 'next/navigation';

await connect();
// return all the Attendance records in the database
export async function GET(req) {
  // get any URL query params
  const urlSearchParams = new URLSearchParams(req.nextUrl.searchParams);
  const params = Object.fromEntries(urlSearchParams.entries());

  let query;
  let attendanceResult;
  // get all the keys from params
  const keys = Object.keys(params);

  console.log(keys);
  try {
    switch (keys[0]) {
      case 'event':
        console.log('Getting all users attending an event');
        query = { event: params.event };
        attendanceResult = await Attendance.find(query).select('user').exec();
        break;
      case 'user':
        console.log('Getting all events a user has attended');
        query = { user: params.user };
        attendanceResult = await Attendance.find(query).select('event').exec();
        break;
      default:
        console.log('Getting all attendance records');
        attendanceResult = await Attendance.find();
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