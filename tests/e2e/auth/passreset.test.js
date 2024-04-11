import { test, expect } from '@playwright/test';
import { getCookie, randomString } from '../../utils';
import User from '@/app/api/models/user.model';
import { connect } from '@/app/api/services/mongoose.service';
import { HTTP } from '@/utils/globals';

/**
 * Test the user password reset end-to-end system
 * @author Alec Painter
 */

let userInfo = {};

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto('/register');

  // Generate user information
  const rs = randomString(12);
  userInfo = {
    fullName: 'reset test',
    displayName: 'resettest' + rs,
    email: 'reset-e2e@test.com' + rs,
    password: 'resettest',
    newPassword: 'newpass',
    secQuestion: 'What is your mothers maiden name',
    secAnswer: 'test',
  };
});

test.afterEach(async () => {
  await connect();
  const deletedUser = await User.deleteOne({
    'details.email': userInfo.email,
  });
  expect(deletedUser).toBeDefined();
});

test('Reset end-to-end', async ({ page }) => {
  // Register user with info
  await page.getByPlaceholder('Full Name').fill(userInfo.fullName);
  await page.getByPlaceholder('Display Name').fill(userInfo.displayName);
  await page.getByPlaceholder('Email').fill(userInfo.email);
  await page.getByPlaceholder('Password').fill(userInfo.password);
  await page.getByText('Choose a security question').click();
  await page.getByRole('option', { name: userInfo.secQuestion }).click();
  await page.getByPlaceholder('Answer').fill(userInfo.secAnswer);
  let responsePromise = page.waitForResponse('**/api/users');
  await page.getByLabel('Register').click();
  let response = await responsePromise;
  expect(response.status()).toBe(HTTP.CREATED);

  // Log in as user
  await page.waitForURL('/login');
  await page.getByPlaceholder('Email').fill(userInfo.email);
  await page.getByPlaceholder('Password').fill(userInfo.password);
  responsePromise = page.waitForResponse('**/api/auth/callback/password-login');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  response = await responsePromise;
  expect(response.status()).toBe(HTTP.OK);

  // Redirected to home page
  await page.waitForURL('/');
  await expect(page).toHaveURL('/');

  await page.goto('/settings');
  await page.getByRole('button', { name: 'Change Password' }).click();
  await page.waitForURL('/reset');
  await expect(page).toHaveURL('/reset');

  await page
    .getByPlaceholder('Password', { exact: true })
    .fill(userInfo.newPassword);
  await page
    .getByPlaceholder('Confirm Password', { exact: true })
    .fill(userInfo.newPassword);

  responsePromise = page.waitForResponse('**/api/users/password');
  await page.getByRole('button', { name: 'Reset' }).click();
  response = await responsePromise;
  expect(response.status()).toBe(HTTP.OK);

  await expect(page).toHaveURL(/login.*/);
  let sessionToken = await getCookie(page, 'next-auth.session-token');
  expect(sessionToken).toBeNull();

  // Attempt to login with old password
  await page.getByPlaceholder('Email').fill(userInfo.email);
  await page.getByPlaceholder('Password').fill(userInfo.password);
  responsePromise = page.waitForResponse('**/api/auth/callback/password-login');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  response = await responsePromise;
  expect(response.status()).toBe(HTTP.UNAUTHORIZED);

  // Attempt to log in correctly
  await page.getByPlaceholder('Email').fill(userInfo.email);
  await page.getByPlaceholder('Password').fill(userInfo.newPassword);
  responsePromise = page.waitForResponse('**/api/auth/callback/password-login');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  response = await responsePromise;
  expect(response.status()).toBe(HTTP.OK);

  // Redirected to home page
  await page.waitForURL('/');
  await expect(page).toHaveURL('/');

  // Check if session has loaded
  sessionToken = await getCookie(page, 'next-auth.session-token');
  expect(sessionToken).toBeDefined();
});
