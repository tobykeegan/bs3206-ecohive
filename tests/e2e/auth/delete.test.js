import { test, expect } from '@playwright/test';
import { getCookie, randomString } from '../../utils';
import User from '@/app/api/models/user.model';
import { connect } from '@/app/api/services/mongoose.service';

/**
 * Test the user deletion works
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
    fullName: 'delete test',
    displayName: 'deletetest' + rs,
    email: 'delete-e2e@test.com' + rs,
    password: 'deletetest',
    secQuestion: 'What is your mothers maiden name',
    secAnswer: 'test',
  };
});

test.afterEach(async () => {
  await connect();
  const user = await User.findOne({ 'details.email': userInfo.email });
  if (user) {
    const deletedUser = await User.deleteOne({
      'details.email': userInfo.email,
    });
    expect(deletedUser).toBeDefined();
  } else {
    expect(user).toBeNull();
  }
});

test('Delete end-to-end', async ({ page }) => {
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
  expect(response.status()).toBe(201);

  // Log in as user
  await page.waitForURL('/login');
  await page.getByPlaceholder('Email').fill(userInfo.email);
  await page.getByPlaceholder('Password').fill(userInfo.password);
  responsePromise = page.waitForResponse('**/api/auth/callback/password-login');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  response = await responsePromise;
  expect(response.status()).toBe(200);

  // Redirected to home page
  await page.waitForURL('/');
  await expect(page).toHaveURL('/');

  // Delete user account in settings
  await page.goto('/settings');
  // Click first button
  await page.getByRole('button', { name: 'Delete Account' }).click();
  // Click second button
  await page.getByRole('button', { name: 'Delete Account' }).click();

  await expect(page).toHaveURL(/login.*/);
  const sessionToken = await getCookie(page, 'next-auth.session-token');
  expect(sessionToken).toBeNull();

  await connect();
  const user = await User.findOne({ 'details.email': userInfo.email });
  expect(user).toBeNull();
});
