import { expect, test } from '@playwright/test';
import { connect } from '@/services/mongoose';
import { HTTP } from '@/utils/globals';

require('dotenv').config();

/**
 * Test request to the /api/users endpoint to retrieve the users with the most points.
 * @author Jade Carino
 */
test.describe('Tests request to endpoint /api/users?limit=5', () => {
  // Before each test, connect to the database
  test.beforeAll(async () => {
    await connect();
  });

  test('Should get a response from GET to /api/users?limit=5 with the 5 top users', async ({
    request,
  }) => {
    const response = await request.get(`/api/users?limit=5`);
    const body = await response.json();
    expect(response.status()).toBe(HTTP.OK);

    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty('topUsers');

    const topUsers = body.topUsers;
    expect(topUsers).toBeInstanceOf(Array);
    expect(topUsers.length).toBe(5);

    topUsers.forEach((topUser) => {
      expect(topUser).toBeInstanceOf(Object);
      expect(topUser).toHaveProperty('name');
      expect(topUser).toHaveProperty('score');

      const name = topUser.name;
      expect(name).toHaveProperty('display'); // We need the display name for the leaderboard

      const score = topUser.score;
      expect(score).toHaveProperty('level'); // We need their level
      expect(score).toHaveProperty('points'); // and points too
    });
  });
});
