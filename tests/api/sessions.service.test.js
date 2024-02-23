import {
  createSession,
  isSessionExpired,
} from '../../src/app/api/services/sessions.service';
import { expect, test } from '@playwright/test';
import { randomString } from '../utils';
import { connect } from '../../src/app/api/services/mongoose.service';
import User from '../../src/app/api/models/user.model';
import Session from '../../src/app/api/models/session.model';

test.describe('Create a new user session', () => {
  test('should return the session id', async () => {
    connect();
    const randStr = randomString(8);
    const testUser = new User({
      id: 1234,
      name: {
        first: 'session',
        last: 'test',
        display: 'session test' + randStr,
      },
      details: {
        email: 'sessionTest@' + randStr + '.com',
      },
      passwordHash: 'abc',
    });
    const sessionID = await createSession(testUser);
    let session = await Session.findById(sessionID);
    expect(session).toBeDefined();
    expect(session.userId).toEqual(testUser.id);
  });
});

test.describe('Test if a session has expired', () => {
  const testCases = [
    {
      name: 'Session expired in past',
      sessionExpiryDate: Date.now() - 10 * 60 * 60 * 1000,
      expected: true,
    },
    {
      name: 'Session expires in future',
      sessionExpiryDate: Date.now() + 10 * 60 * 60 * 1000,
      expected: false,
    },
  ];

  for (const testCase of testCases) {
    test(`${testCase.name}: should return ${testCase.expected}`, async () => {
      const session = new Session({
        userId: 123,
        expiry: testCase.sessionExpiryDate,
      });
      expect(isSessionExpired(session)).toEqual(testCase.expected);
    });
  }
});
