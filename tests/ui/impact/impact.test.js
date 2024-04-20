import { expect, test } from '@playwright/test';

/**
 * Ensure to go to the Impact Page before each test.
 */
test.beforeEach(async ({ page }) => {
  await page.goto('/impact');
});

/**
 *  Impact Page visibility tests.
 * @author Jade Carino
 */
test.describe('Impact Page components visibility', () => {
  const components = [
    {
      id: 'Points-Card',
      text: 'Points Earned',
      type: 'card',
    },
    {
      id: 'Leaderboard-Card',
      text: 'Leaderboard',
      type: 'card',
    },
    {
      id: 'Badges-Card',
      text: 'Badges',
      type: 'card',
    },
  ];

  components.forEach((component) => {
    test(`Check visibility of '${component.id}'`, async ({ page }) => {
      await expect(page.getByText(component.text)).toBeVisible();
    });
  });
});
