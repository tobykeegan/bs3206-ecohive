import { connect } from '@/services/mongoose';
import logger from '@/utils/logger';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { HTTP } from '@/utils/globals';

await connect();

/**
 * GET request to /api/users/score.
 * Retrieves a score object with their points and level.
 *
 * @param {Object} request - The request object.
 * @returns {NextResponse} - A next response containing a JSON object.
 * @throws {NextResponse} - A 404 error if the user cannot be found.
 *
 * @author Jade Carino
 */
export async function GET(req) {
  const queryParams = req.nextUrl.searchParams;
  const email = queryParams.get('email');

  logger.debug(`Fetching score for ${email}`);

  const user = await User.findOne({
    'details.email': email,
  }).select('+score');
  if (!user) {
    logger.warn(`Could not find user: ${email}`);
    return NextResponse.json(
      { message: 'Unable to find user' },
      { status: HTTP.NOT_FOUND },
    );
  }

  return NextResponse.json({ score: user.score }, { status: HTTP.OK });
}
