import { expect, test } from '@playwright/test';

require('dotenv').config()

const IM_A_TEAPOT = 418;

test.describe('GET /api/ping', () => {
  test('should return pong', async ({ request }) => {
    const response = await request.get('/api/ping');

    const body = await response.json();

    expect(response.status()).toBe(IM_A_TEAPOT);

    expect(body).toEqual(
      expect.objectContaining({
        "message": 'pong',
        "dbstate" : {
          "name" : process.env.DB_VERSION,
          "state" : "connected"
        }
      }),
    );
  });
});
