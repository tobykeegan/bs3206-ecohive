import logger from '@/utils/logger';
import { connect } from '@/app/api/services/mongoose.service';
import bcrypt from 'bcrypt';
import User from '@/app/api/models/user.model';
import { NextResponse } from 'next/server';

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
    var user = await User.findOne({ 'details.email': email });
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

    // TODO: Session management stuffs

    const response = NextResponse.json({
      message: 'User authenticated',
      success: true,
    });

    return response;
  } catch (error) {
    logger.error(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
