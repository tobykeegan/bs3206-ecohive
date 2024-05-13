import logger from '@/utils/logger';
import { connect } from '@/services/mongoose';
import User from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import { HTTP } from '@/utils/globals';

await connect();

/**
 * Get the security question for the user
 * @author Alec Painter
 * @param {NextRequest} req
 * @returns {NextResponse}
 */
export async function GET(req) {
  const queryParams = req.nextUrl.searchParams;
  const email = queryParams.get('email');

  logger.debug(`Fetching security question for ${email}`);

  const user = await User.findOne({
    'details.email': email,
  }).select('+security.question');
  if (!user) {
    logger.warn(`Could not find user: ${email}`);
    return NextResponse.json(
      { message: 'Unable to find user' },
      { status: HTTP.NOT_FOUND },
    );
  }

  return NextResponse.json(
    { secQuestion: user.security.question },
    { status: HTTP.OK },
  );
}
