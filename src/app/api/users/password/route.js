import { connect } from '@/services/mongoose';
import { getServerSession } from 'next-auth';
import logger from '@/utils/logger';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { authOptions } from '@/api/auth/[...nextauth]/route';

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
      { status: 401 },
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: 'Passwords do not match' },
      { status: 400 },
    );
  }

  const user = await User.findOne({
    'details.email': session.user.email,
  }).select('+password');
  if (!user) {
    logger.warn(`Could not find user: ${session.user.email}`);
    return NextResponse.json(
      { message: 'Unable to find user in database' },
      { status: 404 },
    );
  }

  const passDuplicate = await user.comparePassword(password);
  if (passDuplicate) {
    return NextResponse.json(
      {
        message: 'Password does not meet criteria, please try a different one',
      },
      { status: 400 },
    );
  }

  try {
    user.password = password;
    await user.save();
    return NextResponse.json({ message: 'Password updated' }, { status: 200 });
  } catch (err) {
    logger.error(`Error while updating user password: ${err}`);
    return NextResponse.json(
      { message: 'An error occured while changing password' },
      { status: 500 },
    );
  }
}
