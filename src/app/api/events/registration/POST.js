import { NextResponse } from 'next/server';
import { HTTP } from '@/utils/globals';
import Attendance from '@/models/attendance';

export default async function POST(req) {
  try {
    await attendance.save();
    const { event, user } = req.body;

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
