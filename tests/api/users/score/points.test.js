import { expect, test } from '@playwright/test';
import { connect } from '@/services/mongoose';
import { HTTP } from '@/utils/globals';

require('dotenv').config();

/**
 * Test requests to the /api/users/score/points endpoint.
 * These test the following scenarios:
 * - Retrieving a user's level
 * - Retrieving the level of a nonexistent user
 * - Updating a user's level
 * @author Jade Carino
 */
test.describe('Test requests to endpoint /api/users/score/points', () => {
  test.describe.configure({ retries: 3, mode: 'serial' });

  // Before each test, connect to the database
  test.beforeAll(async () => {
    await connect();
  });

  test('Should get a response from GET to /api/users/score/points', async ({
    request,
  }) => {
    let req = await request.get('/api/whoami');
    let user = await req.json();

    const response = await request.get(
      `/api/users/score/points?email=${user.message.email}`,
    );
    const body = await response.json();
    expect(response.status()).toBe(HTTP.OK);

    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty('points');
  });

  test('Should get a not found response from GET to /api/users/score/points', async ({
    request,
  }) => {
    const response = await request.get(
      `/api/users/score/points?email=nonsense@noexist.com`,
    );
    const body = await response.json();
    expect(response.status()).toBe(HTTP.NOT_FOUND);
    expect(body).toHaveProperty('message', 'Unable to find user');
  });

  test('Should get a response from PATCH to /api/users/score/points', async ({
    request,
  }) => {
    let req = await request.get('/api/whoami');
    let user = await req.json();

    const response = await request.patch(`/api/users/score/points`, {
      data: JSON.stringify({ email: user.message.email, pointsToAdd: 500 }),
    });
    const body = await response.json();
    expect(response.status()).toBe(HTTP.OK);

    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty('message', 'Points updated');
  });

  test('Should get a not found response from PATCH to /api/users/score/points with nonexistent user', async ({
    request,
  }) => {
    const response = await request.patch(`/api/users/score/points`, {
      data: JSON.stringify({ email: 'nonsense@noexist.com', pointsToAdd: 500 }),
    });
    const body = await response.json();
    expect(response.status()).toBe(HTTP.NOT_FOUND);
    expect(body).toHaveProperty('message', 'Unable to find user in database');
  });
});
