import { expect, test } from '@playwright/test';
import { connect } from '@/services/mongoose';
import { HTTP } from '@/utils/globals';
import { randomString } from '@/test/utils';

require('dotenv').config();

/**
 * Test requests to the /api/users/badges endpoint.
 * These test the following scenarios:
 * - Retrieving a user's badges
 * - Retrieving badges from a nonexistent user
 * - Updating a user's badges
 * @author Jade Carino
 */
test.describe('Test requests to endpoint /api/users/badges', () => {
  test.describe.configure({ retries: 3, mode: 'serial' });

  // Before each test, connect to the database
  test.beforeAll(async () => {
    await connect();
  });

  test('Should get a response from GET to /api/users/badges', async ({
    request,
  }) => {
    let req = await request.get('/api/whoami');
    let user = await req.json();

    const response = await request.get(`/api/users/badges?email=${user.email}`);
    const body = await response.json();
    expect(response.status()).toBe(HTTP.OK);

    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty('badges');

    const badges = body.badges;
    expect(badges).toBeInstanceOf(Array);
  });

  test('Should get a not found response from GET to /api/users/badges', async ({
    request,
  }) => {
    const response = await request.get(
      `/api/users/badges?email=nonsense@noexist.com`,
    );
    const body = await response.json();
    expect(response.status()).toBe(HTTP.NOT_FOUND);
    expect(body).toHaveProperty('message', 'Unable to find user');
  });

  test('Should get a response from PATCH to /api/users/badges', async ({
    request,
  }) => {
    let req = await request.get('/api/whoami');
    let user = await req.json();

    // Use a random string for the badge Id to ensure we don't try to add the same
    // badge Id later in the test suite and get a 400.
    const randomBadgeId = randomString(3);

    const response = await request.patch(`/api/users/badges`, {
      data: JSON.stringify({
        email: user.email,
        badgeId: randomBadgeId,
      }),
    });
    const body = await response.json();
    expect(response.status()).toBe(HTTP.OK);

    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty('message', 'Badges updated');
  });

  test('Should get a not found response from PATCH to /api/users/badges with nonexistent user', async ({
    request,
  }) => {
    const response = await request.patch(`/api/users/badges`, {
      data: JSON.stringify({ email: 'nonsense@noexist.com', badgeId: '0' }),
    });
    const body = await response.json();
    expect(response.status()).toBe(HTTP.NOT_FOUND);
    expect(body).toHaveProperty('message', 'Unable to find user in database');
  });
});
