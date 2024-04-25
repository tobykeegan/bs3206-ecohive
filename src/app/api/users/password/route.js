import { connect } from '@/services/mongoose';
import { getServerSession } from 'next-auth';
import logger from '@/utils/logger';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import { HTTP } from '@/utils/globals';

await connect();

/**
 * Change a user's password
 * @author Alec Painter
 */
export async function PATCH(req) {
  const reqBody = await req.json();
  let { password, confirmPassword } = reqBody;

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    logger.warn(`Cannot edit user without a session`);
    return NextResponse.json(
      { message: 'User not logged in' },
      { status: HTTP.UNAUTHORIZED },
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: 'Passwords do not match' },
      { status: HTTP.BAD_REQUEST },
    );
  }

  const user = await User.findOne({
    'details.email': session.user.email,
  }).select('+password');
  if (!user) {
    logger.warn(`Could not find user: ${session.user.email}`);
    return NextResponse.json(
      { message: 'Unable to find user in database' },
      { status: HTTP.NOT_FOUND },
    );
  }

  const passDuplicate = await user.comparePassword(password);
  if (passDuplicate) {
    return NextResponse.json(
      {
        message: 'Password does not meet criteria, please try a different one',
      },
      { status: HTTP.BAD_REQUEST },
    );
  }

  try {
    user.password = password;
    await user.save();
    return NextResponse.json(
      { message: 'Password updated' },
      { status: HTTP.OK },
    );
  } catch (err) {
    logger.error(`Error while updating user password: ${err}`);
    return NextResponse.json(
      { message: 'An error occured while changing password' },
      { status: HTTP.INTERNAL_SERVER_ERROR },
    );
  }
}
