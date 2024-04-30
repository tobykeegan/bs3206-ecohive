import { connect } from '@/services/mongoose';
import logger from '@/utils/logger';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { HTTP } from '@/utils/globals';

await connect();

/**
 * Get a user's badges to display on the Impact Page.
 * @author Jade Carino
 */
export async function GET(req) {
  const queryParams = req.nextUrl.searchParams;
  const email = queryParams.get('email');

  logger.debug(`Fetching badges for ${email}`);

  const user = await User.findOne({
    'details.email': email,
  }).select('+badges');
  if (!user) {
    logger.warn(`Could not find user: ${email}`);
    return NextResponse.json(
      { message: 'Unable to find user' },
      { status: HTTP.NOT_FOUND },
    );
  }

  return NextResponse.json({ badges: user.badges }, { status: HTTP.OK });
}

/**
 * Update a user's badges.
 * @author Jade Carino
 */
export async function PATCH(req) {
  const reqBody = await req.json();
  let { email, badgeId } = reqBody;

  logger.debug(`Adding badge ${badgeId} to user's badges`);

  const user = await User.findOne({
    'details.email': email,
  }).select('+badges');
  if (!user) {
    logger.warn(`Could not find user: ${email}`);
    return NextResponse.json(
      { message: 'Unable to find user in database' },
      { status: HTTP.NOT_FOUND },
    );
  }

  try {
    let currentBadges = user.badges;
    if (currentBadges.includes(badgeId)) {
      return NextResponse.json(
        { message: 'User already has this badge' },
        { status: HTTP.BAD_REQUEST },
      );
    }
    currentBadges.push(badgeId);
    user.badges = currentBadges;
    await user.save();
    return NextResponse.json(
      { message: 'Badges updated' },
      { status: HTTP.OK },
    );
  } catch (err) {
    logger.error(`Error while updating the users badges: ${err}`);
    return NextResponse.json(
      { message: 'An error occured while updating the users badges' },
      { status: HTTP.INTERNAL_SERVER_ERROR },
    );
  }
}
