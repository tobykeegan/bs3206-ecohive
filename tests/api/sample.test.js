import { expect, test } from '@playwright/test';

const IM_A_TEAPOT = 418;

test.describe('GET /api/ping', () => {
  test('should return pong', async ({ request }) => {
    const response = await request.get('/api/ping');

    const body = await response.json();

    expect(response.status()).toBe(IM_A_TEAPOT);

    expect(body).toEqual(
      expect.objectContaining({
        message: 'pong',
      }),
    );

    expect(body.message).toBe('pong');
  });
});
