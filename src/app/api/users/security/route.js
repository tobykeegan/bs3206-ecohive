import logger from '@/utils/logger';
import { connect } from '@/services/mongoose';
import bcrypt from 'bcrypt';
import User from '@/models/user';
import { NextResponse } from 'next/server';

await connect();

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
      { status: 404 },
    );
  }

  logger.debug(user);

  return NextResponse.json(
    { secQuestion: user.security.question },
    { status: 200 },
  );
}
