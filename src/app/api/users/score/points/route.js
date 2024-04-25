import { connect } from '@/services/mongoose';
import { getServerSession } from 'next-auth';
import logger from '@/utils/logger';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import { HTTP } from '@/utils/globals';
import axios from 'axios';

await connect();

/**
 * Get a user's points to display on the Impact Page.
 * @author Jade Carino
 */
export async function GET(req) {
  const queryParams = req.nextUrl.searchParams;
  const email = queryParams.get('email');

  logger.debug(`Fetching points for ${email}`);

  const user = await User.findOne({
    'details.email': email,
  }).select('+score.points');
  if (!user) {
    logger.warn(`Could not find user: ${email}`);
    return NextResponse.json(
      { message: 'Unable to find user' },
      { status: HTTP.NOT_FOUND },
    );
  }

  return NextResponse.json({ points: user.score.points }, { status: HTTP.OK });
}

/**
 * Update a user's points by the number of points provided.
 * @author Jade Carino
 */
export async function PATCH(req) {
  const reqBody = await req.json();
  let { email, pointsToAdd } = reqBody;

  const user = await User.findOne({
    'details.email': email,
  }).select('+score.points');
  if (!user) {
    logger.warn(`Could not find user: ${email}`);
    return NextResponse.json(
      { message: 'Unable to find user in database' },
      { status: HTTP.NOT_FOUND },
    );
  }

  // Calculate if this point increase will increase their level
  if (user.score.points + pointsToAdd < 1000) {
    try {
      user.score.points = user.score.points + pointsToAdd;
      await user.save();
      return NextResponse.json(
        { message: 'Points updated' },
        { status: HTTP.OK },
      );
    } catch (err) {
      logger.error(`Error while updating the users points: ${err}`);
      return NextResponse.json(
        { message: 'An error occured while updating the users points' },
        { status: HTTP.INTERNAL_SERVER_ERROR },
      );
    }
  } else {
    // To do:
    // Their level also needs to be upgraded!
    // That API call should happen in the component/page...

    // Upgrade their points at the start of a new level
    try {
      user.score.points = user.score.points + pointsToAdd - 1000;
      await user.save();
      return NextResponse.json(
        { message: 'Points updated' },
        { status: HTTP.OK },
      );
    } catch (err) {
      logger.error(`Error while updating the users points: ${err}`);
      return NextResponse.json(
        { message: 'An error occured while updating the users points' },
        { status: HTTP.INTERNAL_SERVER_ERROR },
      );
    }
  }
}
