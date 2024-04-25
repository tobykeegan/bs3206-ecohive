import { expect, test } from '@playwright/test';
import { randomString } from '../../utils';
import { HTTP } from '@/utils/globals';
import User from '@/app/api/models/user.model';
import { connect } from '@/app/api/services/mongoose.service';

require('dotenv').config();

/**
 * Test that user's upon registration have the following fields
 * associated with their user to support gamification:
 * points = 0
 * level = 1
 * badges = []
 * @author Jade Carino
 */

let userInfo = {};
let rs;

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto('/login');

  // Generate user information
  rs = randomString(12);
  userInfo = {
    fullName: 'Impact Test',
    displayName: 'Impact' + rs,
    email: 'impact@test.com' + rs,
    password: 'impacttest',
    secQuestion: 'What is your mothers maiden name',
    secAnswer: 'test',
  };
});

test.afterEach(async () => {
  console.log(`Deleting test user ${userInfo.email}`);
  await connect();
  const deletedUser = await User.findOneAndDelete({
    'details.email': userInfo.email,
  });
  expect(deletedUser).toBeDefined();
});

test.describe('Impact at registration', () => {
  test('Users points are 0 at registration', async ({ page, request }) => {
    // First register a new user
    await page.goto('/register');
    await page.getByPlaceholder('Full Name').fill(userInfo.fullName);
    await page.getByPlaceholder('Display Name').fill(userInfo.displayName);
    await page.getByPlaceholder('Email').fill(userInfo.email);
    await page.getByPlaceholder('Password').fill(userInfo.password);
    await page.getByText('Choose a security question').click();
    await page.getByRole('option', { name: userInfo.secQuestion }).click();
    await page.getByPlaceholder('Answer').fill(userInfo.secAnswer);
    let responsePromise = page.waitForResponse('**/api/users');
    await page.getByLabel('Register').click({ force: true });
    let response = await responsePromise;
    expect(response.status()).toBe(HTTP.CREATED);

    response = await request.get(
      '/api/users/score/points?email=impact@test.com' + rs,
    );
    let body = await response.json();
    expect(response.status()).toBe(HTTP.OK);
    expect(body).toEqual(
      expect.objectContaining({
        points: 0,
      }),
    );
  });

  test('Users level is 1 at registration', async ({ page, request }) => {
    // First register a new user
    await page.goto('/register');
    await page.getByPlaceholder('Full Name').fill(userInfo.fullName);
    await page.getByPlaceholder('Display Name').fill(userInfo.displayName);
    await page.getByPlaceholder('Email').fill(userInfo.email);
    await page.getByPlaceholder('Password').fill(userInfo.password);
    await page.getByText('Choose a security question').click();
    await page.getByRole('option', { name: userInfo.secQuestion }).click();
    await page.getByPlaceholder('Answer').fill(userInfo.secAnswer);
    let responsePromise = page.waitForResponse('**/api/users');
    await page.getByLabel('Register').click({ force: true });
    let response = await responsePromise;
    expect(response.status()).toBe(HTTP.CREATED);

    response = await request.get(
      '/api/users/score/level?email=impact@test.com' + rs,
    );
    const body = await response.json();
    expect(response.status()).toBe(HTTP.OK);
    expect(body).toEqual(
      expect.objectContaining({
        level: 1,
      }),
    );
  });

  test('Users badges are empty at registration', async ({ page, request }) => {
    // First register a new user
    await page.goto('/register');
    await page.getByPlaceholder('Full Name').fill(userInfo.fullName);
    await page.getByPlaceholder('Display Name').fill(userInfo.displayName);
    await page.getByPlaceholder('Email').fill(userInfo.email);
    await page.getByPlaceholder('Password').fill(userInfo.password);
    await page.getByText('Choose a security question').click();
    await page.getByRole('option', { name: userInfo.secQuestion }).click();
    await page.getByPlaceholder('Answer').fill(userInfo.secAnswer);
    let responsePromise = page.waitForResponse('**/api/users');
    await page.getByLabel('Register').click({ force: true });
    let response = await responsePromise;
    expect(response.status()).toBe(HTTP.CREATED);

    response = await request.get(
      '/api/users/badges?email=impact@test.com' + rs,
    );

    const body = await response.json();

    expect(response.status()).toBe(HTTP.OK);

    expect(body).toEqual(
      expect.objectContaining({
        badges: [],
      }),
    );
  });
});
