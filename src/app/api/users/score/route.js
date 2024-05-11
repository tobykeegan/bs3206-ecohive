import { connect } from '@/services/mongoose';
import logger from '@/utils/logger';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { HTTP } from '@/utils/globals';

await connect();

/**
 * Get a user's score which contains their points and level.
 * Put into one API call to minimise contact with the DB for performance.
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
