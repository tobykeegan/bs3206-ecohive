import logger from '@/utils/logger';
import { connect } from '@/services/mongoose';
import bcrypt from 'bcrypt';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';

await connect();

/**
 * Register a new user
 * @author Alec Painter
 */
export async function POST(req) {
  const reqBody = await req.json();
  let { fullName, displayName, email, password, secQuestion, secAnswer } =
    reqBody;
  logger.debug(`Attempting to register new user: ${email}`);
  try {
    // Check if user exists
    let user = await User.findOne({ 'details.email': email });
    if (user) {
      logger.warn(`User '${email}' already exists`);
      return NextResponse.json(
        { message: 'User email already exists' },
        { status: 400 },
      );
    }
    user = await User.findOne({ 'name.display': displayName });
    if (user) {
      logger.warn(`User '${displayName}' already exists`);
      return NextResponse.json(
        { message: 'Display name already exists' },
        { status: 400 },
      );
    }

    if (!validateFullName(fullName)) {
      logger.warn(`User fullname failed validation: ${fullName}`);
      return NextResponse.json(
        {
          message:
            'Fullname must only contains letters and a space between names',
        },
        { status: 400 },
      );
    }

    fullName = toTitleCase(fullName);
    const name = fullName.split(' ');

    if (displayName == null || displayName == '') {
      displayName = fullName;
    }

    // Create new user
    await User.create({
      name: {
        first: name[0],
        last: name[1],
        display: displayName,
      },
      details: {
        email: email,
      },
      password: password,
      security: {
        question: secQuestion,
        answer: secAnswer,
      },
    });

    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (err) {
    logger.error(err);
    const errors = err.errors;
    return NextResponse.json(
      { message: errors[Object.keys(errors)[0]].message },
      { status: 500 },
    );
  }
}

/**
 * Delete the user's account
 * @author Alec Painter
 */
export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    logger.warn(`Cannot delete user without a session`);
    return NextResponse.json(
      { message: 'User not logged in' },
      { status: 401 },
    );
  }

  const deletedUser = await User.findOneAndDelete({
    'details.email': session.user.email,
  });
  if (!deletedUser) {
    logger.warn(`Cannot delete user`);
    return NextResponse.json(
      { message: 'Unable to delete user' },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: 'User deleted' }, { status: 200 });
}

/**
 * Validates a full name using: /^[A-Za-z]+ [A-Za-z]+$/
 * @author Alec Painter
 * @param {string} fullname
 */
function validateFullName(fullname) {
  const validationPattern = /^[A-Za-z]+ [A-Za-z]+$/;
  return validationPattern.test(fullname);
}

/**
 * Convert a string to title case
 * @author Alec Painter
 * @param {string} str
 * @returns {string} str in title case format
 */
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
