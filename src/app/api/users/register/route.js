import logger from '@/utils/logger';
import { connect } from '@/app/api/services/mongoose.service';
import bcrypt from 'bcrypt';
import User from '@/app/api/models/user.model';
import { NextResponse } from 'next/server';

connect();

/**
 * Register a new user
 * @author Alec Painter
 */
export async function POST(req) {
  const reqBody = await req.json();
  var { fullName, displayName, email, password } = reqBody;
  logger.debug(`Attempting to register new user: ${email}`);
  try {
    // Check if user exists
    var user = await User.findOne({ 'details.email': email });
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

    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (displayName == null || displayName == '') {
      displayName = fullName;
    }

    // Create new user
    const newUser = new User({
      name: {
        first: name[0],
        last: name[1],
        display: displayName,
      },
      details: {
        email: email,
      },
      score: {
        level: 0,
        points: 0,
      },
      passwordHash: hashedPassword,
    });
    logger.debug(`Saving new user: ${email}`);
    await newUser.save();

    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
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
// module.exports.validateFullName = validateFullName;

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
// module.exports.toTitleCase = toTitleCase;
