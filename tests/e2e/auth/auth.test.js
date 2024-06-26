import { test, expect } from '@playwright/test';
import { getCookie, randomString } from '../../utils';
import User from '@/app/api/models/user.model';
import { connect } from '@/app/api/services/mongoose.service';
import { HTTP } from '@/utils/globals';
/**
 * Test the user registration and authentication end-to-end process
 * @author Alec Painter
 */
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

test.describe(() => {
  // All tests in this describe group will get 3 retry attempts.
  test.describe.configure({ retries: 3 });

  test('Authentication end-to-end', async ({ page, isMobile }) => {
    // 2. Attempt to log in (user won't exist)
    await page.getByPlaceholder('Email').fill(userInfo.email);
    await page.getByPlaceholder('Password').fill(userInfo.password);
    let responsePromise = page.waitForResponse(
      '**/api/auth/callback/password-login',
    );
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    let response = await responsePromise;
    expect(response.status()).toBe(HTTP.UNAUTHORIZED);

    // 3. Register user with info
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.waitForURL('**/register');
    await page.getByPlaceholder('Full Name').fill(userInfo.fullName);
    await page.getByPlaceholder('Display Name').fill(userInfo.displayName);
    await page.getByPlaceholder('Email').fill(userInfo.email);
    await page.getByPlaceholder('Password').fill(userInfo.password);
    await page.getByText('Choose a security question').click();
    await page.getByRole('option', { name: userInfo.secQuestion }).click();
    await page.getByPlaceholder('Answer').fill(userInfo.secAnswer);
    responsePromise = page.waitForResponse('**/api/users');
    await page.getByLabel('Register').click();
    response = await responsePromise;
    expect(response.status()).toBe(HTTP.CREATED);

    // 4. Attempt to login with incorrect password
    await page.waitForURL('**/login');
    await page.getByPlaceholder('Email').fill(userInfo.email);
    await page.getByPlaceholder('Password').fill('incorrectpassword');
    responsePromise = page.waitForResponse(
      '**/api/auth/callback/password-login',
    );
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    response = await responsePromise;
    expect(response.status()).toBe(HTTP.UNAUTHORIZED);

    // 5. Attempt to log in correctly (user will exist)
    await page.getByPlaceholder('Email').fill(userInfo.email);
    await page.getByPlaceholder('Password').fill(userInfo.password);
    responsePromise = page.waitForResponse(
      '**/api/auth/callback/password-login',
    );
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    response = await responsePromise;
    expect(response.status()).toBe(HTTP.OK);

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
      await page.getByRole('button', { name: 'Sign out' }).click();
    } else {
      await page.getByRole('button', { name: 'Sign out icon' }).click();
    }
    await expect(page).toHaveURL(/login.*/);
    sessionToken = await getCookie(page, 'next-auth.session-token');
    expect(sessionToken).toBeNull();
  });
});
