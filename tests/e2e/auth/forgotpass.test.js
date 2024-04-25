import { test, expect } from '@playwright/test';
import { getCookie, randomString } from '../../utils';
import User from '@/app/api/models/user.model';
import { connect } from '@/app/api/services/mongoose.service';
import { HTTP } from '@/utils/globals';

/**
 * Test the forgot password end-to-end system
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
    fullName: 'forgot test',
    displayName: 'forgottest' + rs,
    email: 'forgot-e2e@test.com' + rs,
    password: 'forgottest',
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
test.describe(() => {
  // All tests in this describe group will get 3 retry attempts.
  test.describe.configure({ retries: 3 });
  test('Forgot end-to-end', async ({ page }) => {
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

    // Go to forgot page
    await page.waitForURL('/login');
    await page.getByRole('link', { name: 'Forgot?' }).click();
    await page.waitForURL('/forgot');

    // Fill in wrong email
    await page.getByPlaceholder('Email').fill('wrong@email.com');
    responsePromise = page.waitForResponse('**/api/users/security**');
    await page.getByRole('button', { name: 'Reset', exact: true }).click();
    response = await responsePromise;
    expect(response.status()).toBe(HTTP.NOT_FOUND);

    // Fill in correct email
    await page.getByPlaceholder('Email').fill(userInfo.email);
    responsePromise = page.waitForResponse('**/api/users/security**');
    await page.getByRole('button', { name: 'Reset', exact: true }).click();
    response = await responsePromise;
    expect(response.status()).toBe(HTTP.OK);

    // Fill security question
    expect(
      page.getByRole('heading', { name: userInfo.secQuestion + '?' }),
    ).toBeVisible();
    await page.getByPlaceholder('Answer').fill('wrong');
    responsePromise = page.waitForResponse(
      '**/api/auth/callback/security-question-login',
    );
    await page.getByRole('button', { name: 'Reset', exact: true }).click();
    response = await responsePromise;
    expect(response.status()).toBe(HTTP.UNAUTHORIZED);

    // Fill in correct email
    await page.getByPlaceholder('Email').fill(userInfo.email);
    responsePromise = page.waitForResponse('**/api/users/security**');
    await page.getByRole('button', { name: 'Reset', exact: true }).click();
    response = await responsePromise;
    expect(response.status()).toBe(HTTP.OK);

    // Fill security question
    expect(
      page.getByRole('heading', { name: userInfo.secQuestion + '?' }),
    ).toBeVisible();
    await page.getByPlaceholder('Answer').fill(userInfo.secAnswer);
    responsePromise = page.waitForResponse(
      '**/api/auth/callback/security-question-login',
    );
    await page.getByRole('button', { name: 'Reset', exact: true }).click();
    response = await responsePromise;
    expect(response.status()).toBe(HTTP.OK);

    // Redirected to reset page
    await page.waitForURL('/reset');
    await expect(page).toHaveURL('/reset');

    // Check if session has loaded
    const sessionToken = await getCookie(page, 'next-auth.session-token');
    expect(sessionToken).toBeDefined();
  });
});
