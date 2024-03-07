import { test as setup, expect } from '@playwright/test';
import { randomString } from './utils';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // 1. Generate user information
  const rs = randomString(12);
  const ps = randomString(12);
  const userInfo = {
    fullName: 'test user',
    displayName: 'testuser' + rs,
    email: 'testuser@test.com' + rs,
    password: ps,
  };

  // Register test user
  await page.goto('/register');
  await page.getByPlaceholder('Full Name').fill(userInfo.fullName);
  await page.getByPlaceholder('Display Name').fill(userInfo.displayName);
  await page.getByPlaceholder('Email').fill(userInfo.email);
  await page.getByPlaceholder('Password').fill(userInfo.password);
  let responsePromise = page.waitForResponse('**/api/users');
  await page.getByRole('button', { name: 'Sign up' }).click({ force: true });
  let response = await responsePromise;
  expect(response.status()).toBe(201);

  // Attempt to log in
  await page.waitForURL('**/login');
  await page.getByPlaceholder('Email').fill(userInfo.email);
  await page.getByPlaceholder('Password').fill(userInfo.password);
  responsePromise = page.waitForResponse('**/api/auth/callback/credentials');
  await page.getByRole('button', { name: 'Login' }).click();
  response = await responsePromise;
  expect(response.status()).toBe(200);

  await page.context().storageState({ path: authFile });
});
