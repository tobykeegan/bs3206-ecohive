import { expect, test } from '@playwright/test';
import { mongo, HTTP } from '@/utils/globals';

require('dotenv').config();

test.describe('GET /api/ping', () => {
  test('should return pong', async ({ request }) => {
    const response = await request.get('/api/ping');

    const body = await response.json();

    expect(response.status()).toBe(HTTP.IM_A_TEAPOT);

    expect(body).toEqual(
      expect.objectContaining({
        message: 'pong',
        dbstate: {
          name: mongo.db,
          state: 'connected',
        },
      }),
    );
  });
});
