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
    const bodyString = JSON.stringify(body);

    expect(response.status()).toBe(HTTP.OK);
    expect(bodyString).toContain('badges');
    expect(bodyString).toContain('__v');
    expect(bodyString).toContain('_id');
    expect(bodyString).toContain('id');
    expect(bodyString).toContain('name');
    expect(bodyString).toContain('description');
    expect(bodyString).toContain('imageId');
    expect(bodyString).toContain('type');
    expect(bodyString).toContain('criteria');
    expect(bodyString).toContain('serializedFunction');
  });
});
