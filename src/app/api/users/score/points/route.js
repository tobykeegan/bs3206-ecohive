import { connect } from '@/services/mongoose';
import logger from '@/utils/logger';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { HTTP, URL } from '@/utils/globals';
import axios from 'axios';

await connect();

/**
 * GET request to /api/users/score/points.
 * Retrieves the user's points to display on the Home and Impact pages.
 *
 * @param {Object} request - The request object.
 * @returns {NextResponse} - A next response containing the user's points.
 * @throws {NextResponse} - A 404 error if the user cannot be found.
 *
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
 * PATCH request to /api/users/score/points.
 * Updates the users points by the number provided in the request.
 * Also calls the PATCH request to /api/users/score/level if their points
 * will be increased above 1000 by the update.
 *
 * @param {Object} request - The request object.
 * @returns {NextResponse} - A next response confirming a successful update.
 * @throws {NextResponse} - A 404 error if the user cannot be found.
 *
 * @author Jade Carino
 */
export async function PATCH(req) {
  const reqBody = await req.json();
  let { userid, pointsToAdd } = reqBody;

  const user = await User.findOne({
    _id: userid,
  }).select('+score.points');
  if (!user) {
    logger.warn(`Could not find user: ${userid}`);
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
    // Their points increase means they should also be upgraded levels too
    try {
      axios.patch(
        `${URL}/api/users/score/level`,
        JSON.stringify({ userid: userid }),
      );
    } catch (err) {
      console.log(err);
    }

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
