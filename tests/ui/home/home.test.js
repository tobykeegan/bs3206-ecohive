import { expect, test } from '@playwright/test';

/**
 *  Home Page Visibility Tests
 * @author Jade Carino
 */

/**
 * Ensure to go to the Home Page before each test.
 */
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Home Page Components Visibility', () => {
  const components = [
    {
      id: 'Welcome-Card',
      text: 'Welcome back',
      type: 'card',
    },
    {
      id: 'Event-Search-Card',
      text: 'Find Events',
      type: 'card',
    },
    {
      id: 'About-EcoHive-Card',
      text: 'About EcoHive',
    },
  ];

  components.forEach((component) => {
    test(`Check visibility of '${component.id}'`, async ({ page }) => {
      await expect(page.getByText(component.text)).toBeVisible();
    });
  });
});
