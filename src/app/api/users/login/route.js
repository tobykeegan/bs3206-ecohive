import logger from '@/utils/logger';
import { connect } from '@/services/mongoose';
import bcrypt from 'bcrypt';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import { createSession } from '@/services/sessions';

connect();

/**
 * Handle a login request
 * @author Alec Painter
 */
export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // Check if user exists
    const user = await User.findOne({ 'details.email': email });
    if (!user) {
      logger.debug(`User '${email}' doesn't exist`);
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 },
      );
    }

    // Check if password matches
    const validPass = await bcrypt.compare(password, user.passwordHash);
    if (!validPass) {
      logger.debug(`Password entered does not match password for '${email}'`);
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      message: 'User authenticated',
      success: true,
    });

    const sessionId = await createSession(user);
    response.cookies.set({
      name: 'session',
      value: sessionId,
      httpOnly: true, // Only send the cookie over HTTP requests
      maxAge: 3600, // Max age of 1 hour (in seconds)
      sameSite: 'lax', // Only allow requests to this origin to include the cookie
      path: '/',
    });

    return response;
  } catch (error) {
    logger.error(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
