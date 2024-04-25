import { test as setup, expect } from '@playwright/test';
import { randomString } from './utils';
import { HTTP } from '@/app/api/utils/globals';
const authFile = 'playwright/.auth/user.json';

/**
 * Create the test user
 * @author Alec Painter
 */
setup('authenticate', async ({ page }) => {
  // 1. Generate user information
  const rs = randomString(12);
  const ps = randomString(12);
  const userInfo = {
    fullName: 'test user',
    displayName: 'testuser' + rs,
    email: 'testuser@test.com' + rs,
    password: ps,
    secQuestion: 'What is your mothers maiden name',
    secAnswer: 'test',
  };

  // Register test user
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

  // Attempt to log in
  await page.waitForURL('**/login');
  await page.getByPlaceholder('Email').fill(userInfo.email);
  await page.getByPlaceholder('Password').fill(userInfo.password);
  responsePromise = page.waitForResponse('**/api/auth/callback/password-login');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  response = await responsePromise;
  expect(response.status()).toBe(HTTP.OK);

  await page.context().storageState({ path: authFile });
});
