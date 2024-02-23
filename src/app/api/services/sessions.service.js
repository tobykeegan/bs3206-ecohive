import Session from '../models/session.model';
import User from '../models/user.model';

/**
 * Returns a new session expiry date
 * @author Alec Painter
 * @returns {Date}
 */
export function getNewSessionExpiry() {
  return Date.now() + 1 * 60 * 60 * 1000;
}

/**
 * Create a new user session for an User
 * @author Alec Painter
 * @param {User}
 * @returns {int} session id
 */
export async function createSession(user) {
  // Create session object
  const session = new Session({
    userId: user.id,
    expiry: getNewSessionExpiry(),
  });

  // Get session ID
  await session.save();
  return session.id;
}

/**
 * Checks if a session has expired
 * @author Alec Painter
 * @param {Session}
 * @returns {Bool}
 */
export function isSessionExpired(session) {
  return session.expiry < Date.now();
}

export async function isAuthenticated(sessionId) {
  const session = await Session.findById(sessionId);
  if (!session) {
    logger.debug(`Session: ${sessionId} not found`);
    return NextResponse.json(
      { message: 'User not authenticated' },
      { status: 401 },
    );
  }

  var user = await User.findById(session.userId);
  if (!user) {
    logger.debug(`User with id ${session.userId}`);
    return NextResponse.json(
      { message: 'User not authenticated' },
      { status: 401 },
    );
  }
}

// TODO: getSession()

// TODO: revokeSession()

// TODO: refreshToken()

/*
  Session will contain:
  - _id
  - user id
  - expiry
*/

// middleware should attach the session data to the request
