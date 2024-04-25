import { expect, test } from '@playwright/test';
import { HTTP } from '@/utils/globals';

require('dotenv').config();

/**
 * Test that badge documents are returned from the /api/badges endpoint.
 * @author Jade Carino
 */
test.describe('GET request to /api/badges', () => {
  test('Badge objects are returned', async ({ request }) => {
    const response = await request.get('/api/badges');
    const body = await response.json();
    expect(response.status()).toBe(HTTP.OK);

    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty('badges');
    expect(body).toHaveProperty('status', 200);

    const badges = body.badges;
    expect(badges).toBeInstanceOf(Array);

    badges.forEach((badge) => {
      expect(badge).toBeInstanceOf(Object);
      expect(badge).toHaveProperty('id');
      expect(badge).toHaveProperty('name');
      expect(badge).toHaveProperty('description');
      expect(badge).toHaveProperty('imageId');
      expect(badge).toHaveProperty('type');

      expect(badge).toHaveProperty('criteria');
      const criteria = badge.criteria;
      expect(criteria).toHaveProperty('serializedFunction');
    });
  });
});
