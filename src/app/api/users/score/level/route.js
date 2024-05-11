import { connect } from '@/services/mongoose';
import logger from '@/utils/logger';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { HTTP } from '@/utils/globals';

await connect();

/**
 * GET request to /api/users/score/level.
 * Retrieves the user's level to display on the Home and Impact pages.
 *
 * @param {Object} request - The request object.
 * @returns {NextResponse} - A next response containing the user's level.
 * @throws {NextResponse} - A 404 error if the user cannot be found.
 *
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
 * PATCH request to /api/users/score/level.
 * Updates the users level incrementing it by 1.
 *
 * @param {Object} request - The request object.
 * @returns {NextResponse} - A next response confirming a successful update.
 * @throws {NextResponse} - A 404 error if the user cannot be found.
 *
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
