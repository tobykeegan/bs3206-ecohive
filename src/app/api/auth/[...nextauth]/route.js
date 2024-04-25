import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connect } from '../../services/mongoose.service';
import User from '../../models/user.model';
import logger from '@/api/utils/logger';

export const authOptions = {
  session: {
    jwt: true, // Use JWTs for holding the sessions
    maxAge: 3600, // 1 Hour
  },
  providers: [
    CredentialsProvider({
      /**
       * Callback function that is run when using the credentials login
       * @author Alec Painter
       * @param {any} credentials
       */
      id: 'password-login',
      name: 'Password Auth',
      async authorize(credentials) {
        logger.debug('Authorising user with credentials password provider');
        connect();

        const user = await User.findOne({
          'details.email': credentials.email,
        }).select('+password');
        if (!user) {
          logger.warn(`Could not find user: ${credentials.email}`);
          throw new Error('Invalid username or password');
        }

        const passValid = await user.comparePassword(credentials.password);
        if (!passValid) {
          logger.warn(`Incorrect password`);
          throw new Error('Invalid username or password');
        }

        return user;
      },
    }),
    CredentialsProvider({
      id: 'security-question-login',
      name: 'Security Question Auth',
      async authorize(credentials) {
        logger.debug(
          'Authorising user with credentials security question provider',
        );
        connect();

        const user = await User.findOne({
          'details.email': credentials.email,
        }).select('+security.answer');
        if (!user) {
          logger.warn(`Could not find user: ${credentials.email}`);
          throw new Error('Invalid credentials');
        }

        const answerValid = await user.compareSecAnswers(credentials.secAnswer);
        if (!answerValid) {
          logger.warn(`Incorrect security answer`);
          throw new Error('Invalid credentials');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    /**
     * Create the session JWT token containing the user information
     * @author Alec Painter
     * @param {Object} param0
     * @param {Object} param0.token
     * @param {import('@/models/user').User} param0.user
     */
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user._id,
          email: user.details.email,
          name: {
            first: user.name.first,
            last: user.name.last,
            display: user.name.display,
          },
          score: {
            level: user.score.level,
            points: user.score.points,
          },
          profilePicture: user.profilePicture,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
