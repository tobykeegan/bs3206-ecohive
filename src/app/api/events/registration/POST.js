import { NextResponse } from 'next/server';
import { HTTP } from '@/utils/globals';
import Attendance from '@/models/attendance';

export default async function POST(request) {
  try {
    // parse the body of the request
    let body;
    try {
      body = await request.json();
      console.log('body is: ', body);
    } catch (err) {
      return NextResponse.json(
        {
          message: 'Invalid JSON body.',
          error: err,
        },
        {
          status: 400,
        },
      );
    }
    const { event, user } = body;

    // check if there is already an event and user pair
    const existingAttendance = await Attendance.findOne({ event, user });
    if (existingAttendance) {
      return NextResponse.json(
        {
          message: 'Attendance record already exists',
        },
        {
          status: HTTP.CONFLICT,
        },
      );
    }

    const attendance = new Attendance({
      event,
      user,
    });
    await attendance.save();
    return NextResponse.json(attendance, { status: HTTP.CREATED });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: 'Error saving attendance record',
        error: err,
      },
      {
        status: HTTP.BAD_REQUEST,
      },
    );
  }
}
