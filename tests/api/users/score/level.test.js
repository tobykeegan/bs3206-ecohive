import { expect, test } from '@playwright/test';
import { connect } from '@/services/mongoose';
import { HTTP } from '@/utils/globals';

require('dotenv').config();

/**
 * Test requests to the /api/users/score/level endpoint.
 * @author Jade Carino
 */
test.describe('Test requests to endpoint /api/users/score/level', () => {
  // Before each test, connect to the database
  test.beforeAll(async () => {
    await connect();
  });

  test('Should get a response from GET to /api/users/score/level', async ({
    request,
  }) => {
    let req = await request.get('/api/whoami');
    let user = await req.json();

    const response = await request.get(
      `/api/users/score/level?email=${user.message.email}`,
    );
    const body = await response.json();
    expect(response.status()).toBe(HTTP.OK);

    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty('level', 1);
  });

  test('Should get a not found response from GET to /api/users/score/level', async ({
    request,
  }) => {
    const response = await request.get(
      `/api/users/score/level?email=nonsense@noexist.com`,
    );
    const body = await response.json();
    expect(response.status()).toBe(HTTP.NOT_FOUND);
    expect(body).toHaveProperty('message', 'Unable to find user');
  });
});
