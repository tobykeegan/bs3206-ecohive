import { connect } from '@/services/mongoose';
import { getServerSession } from 'next-auth';
import logger from '@/utils/logger';
import { NextResponse } from 'next/server';
import User from '@/models/user';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import { HTTP } from '@/utils/globals';
import { GetImageURL } from '@/utils/images';
import Image from '@/models/image';

await connect();

/**
 * Change a user's profile picture id
 * @author Alec Painter
 */
export async function PATCH(req) {
  const reqBody = await req.json();
  let { imageID } = reqBody;

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    logger.warn(`Cannot edit user without a session`);
    return NextResponse.json(
      { message: 'User not logged in' },
      { status: HTTP.UNAUTHORIZED },
    );
  }

  const user = await User.findOne({
    'details.email': session.user.email,
  });
  if (!user) {
    logger.warn(`Could not find user: ${session.user.email}`);
    return NextResponse.json(
      { message: 'Unable to find user in database' },
      { status: HTTP.NOT_FOUND },
    );
  }

  if (user.profilePicture) {
    await Image.findByIdAndDelete(user.profilePicture);
  }

  try {
    user.profilePicture = imageID;
    await user.save();
    return NextResponse.json(
      { message: 'Profile picture updated' },
      { status: HTTP.OK },
    );
  } catch (err) {
    logger.error(`Error while updating user profile picture: ${err}`);
    return NextResponse.json(
      { message: 'An error occured while changing profile picture' },
      { status: HTTP.INTERNAL_SERVER_ERROR },
    );
  }
}

/**
 * Returns the image url to be use as an image src for the user's profile picture
 * @author Alec Painter
 * @returns {string} imageUrl
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    logger.warn(`Cannot get user info without a session`);
    return NextResponse.json(
      { message: 'User not logged in' },
      { status: HTTP.UNAUTHORIZED },
    );
  }

  const user = await User.findOne({
    'details.email': session.user.email,
  });
  if (!user) {
    logger.warn(`Could not find user: ${session.user.email}`);
    return NextResponse.json(
      { message: 'Unable to find user in database' },
      { status: HTTP.NOT_FOUND },
    );
  }

  if (user.profilePicture === undefined) {
    return NextResponse.json(
      { message: 'User has not profile picture' },
      { status: HTTP.NOT_FOUND },
    );
  }

  const imageURL = await GetImageURL(user.profilePicture);
  return new NextResponse(imageURL);
}
