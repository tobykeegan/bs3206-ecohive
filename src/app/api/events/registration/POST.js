import { NextResponse } from 'next/server';
import { HTTP } from '@/utils/globals';
import Attendance from '@/models/attendance';

export default async function POST(req) {
  try {
    await attendance.save();
    const { event, user } = req.body;

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
    return NextResponse.json(attendance);
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
