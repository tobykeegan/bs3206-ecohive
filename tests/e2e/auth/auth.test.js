import { test, expect } from '@playwright/test';
import { getCookie, randomString } from '../../utils';
import User from '@/app/api/models/user.model';

let userInfo = {};

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto('/login');

  // 1. Generate user information
  const rs = randomString(12);
  userInfo = {
    fullName: 'auth test',
    displayName: 'Authe2e' + rs,
    email: 'auth-e2e@test.com' + rs,
    password: 'authtest',
  };
});

test.afterEach(async () => {
  console.log(`Deleting test user ${userInfo.email}`);
  User.findOneAndDelete({ 'details.email': userInfo.email });
});

test('Authentication end-to-end', async ({ page, isMobile }) => {
  // 2. Attempt to log in (user won't exist)
  await page.getByPlaceholder('Email').fill(userInfo.email);
  await page.getByPlaceholder('Password').fill(userInfo.password);
  let responsePromise = page.waitForResponse(
    '**/api/auth/callback/credentials',
  );
  await page.getByRole('button', { name: 'Login' }).click();
  let response = await responsePromise;
  expect(response.status()).toBe(401);

  // 3. Register user with info
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.waitForURL('**/register');
  await page.getByPlaceholder('Full Name').fill(userInfo.fullName);
  await page.getByPlaceholder('Display Name').fill(userInfo.displayName);
  await page.getByPlaceholder('Email').fill(userInfo.email);
  await page.getByPlaceholder('Password').fill(userInfo.password);
  responsePromise = page.waitForResponse('**/api/users');
  await page.getByRole('button', { name: 'Sign up' }).click({ force: true });
  response = await responsePromise;
  expect(response.status()).toBe(201);

  // 4. Attempt to login with incorrect password
  await page.waitForURL('**/login');
  await page.getByPlaceholder('Email').fill(userInfo.email);
  await page.getByPlaceholder('Password').fill('incorrectpassword');
  responsePromise = page.waitForResponse('**/api/auth/callback/credentials');
  await page.getByRole('button', { name: 'Login' }).click();
  response = await responsePromise;
  expect(response.status()).toBe(401);

  // 5. Attempt to log in correctly (user will exist)
  await page.getByPlaceholder('Email').fill(userInfo.email);
  await page.getByPlaceholder('Password').fill(userInfo.password);
  responsePromise = page.waitForResponse('**/api/auth/callback/credentials');
  await page.getByRole('button', { name: 'Login' }).click();
  response = await responsePromise;
  expect(response.status()).toBe(200);

  // 6. Redirected to home page
  await page.waitForURL('/');
  await expect(page).toHaveURL('/');

  // 7. Check if session has loaded
  let sessionToken = await getCookie(page, 'next-auth.session-token');
  expect(sessionToken).toBeDefined();

  // 8. Log out
  if (isMobile) {
    // click navbar
    await page.getByLabel('Toggle navigation').click();

    // Open menu to get to sign out option
    await page.getByRole('button', { name: 'My Account' }).click();
    await page.getByRole('link', { name: 'Sign out' }).click();
  } else {
    await page.getByRole('button', { name: 'Sign out icon' }).click();
  }
  await expect(page).toHaveURL(/login.*/);
  sessionToken = await getCookie(page, 'next-auth.session-token');
  expect(sessionToken).toBeNull();
});
