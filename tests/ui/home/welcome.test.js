import { expect, test } from '@playwright/test';

/**
 * Welcome widget tests.
 * @author Jade Carino
 */

/**
 * Ensure to go to the Home Page before each test.
 */
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Welcome widget on Home Page visibility', () => {
  const components = [
    {
      id: 'welcome-message',
      text: 'Welcome back,',
    },
    {
      id: 'personal-impact',
      text: 'Your personal impact has offset:',
    },
  ];

  components.forEach((component) => {
    test(`Check visibility of '${component.id}'`, async ({ page }) => {
      await expect(page.getByText(component.text)).toBeVisible();
    });
  });
});
