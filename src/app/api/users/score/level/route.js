import { connect } from '@/services/mongoose';
import { getServerSession } from 'next-auth';
import logger from '@/utils/logger';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import { HTTP } from '@/utils/globals';

await connect();

/**
 * Get a user's level to display on the Impact Page.
 * @author Jade Carino
 */
export async function GET(req) {
  const queryParams = req.nextUrl.searchParams;
  const email = queryParams.get('email');

  logger.debug(`Fetching level for ${email}`);

  const user = await User.findOne({
    'details.email': email,
  }).select('+score.level');
  if (!user) {
    logger.warn(`Could not find user: ${email}`);
    return NextResponse.json(
      { message: 'Unable to find user' },
      { status: HTTP.NOT_FOUND },
    );
  }

  return NextResponse.json({ level: user.score.level }, { status: HTTP.OK });
}

/**
 * Update a user's level.
 * @author Jade Carino
 */
export async function PATCH(req) {
  const reqBody = await req.json();
  let { userid } = reqBody;

  const user = await User.findOne({
    _id: userid,
  }).select('+score.level');
  if (!user) {
    logger.warn(`Could not find user: ${email}`);
    return NextResponse.json(
      { message: 'Unable to find user in database' },
      { status: HTTP.NOT_FOUND },
    );
  }

  try {
    user.score.level = user.score.level + 1;
    await user.save();
    return NextResponse.json({ message: 'Level updated' }, { status: HTTP.OK });
  } catch (err) {
    logger.error(`Error while updating the users level: ${err}`);
    return NextResponse.json(
      { message: 'An error occured while updating the users level' },
      { status: HTTP.INTERNAL_SERVER_ERROR },
    );
  }
}
