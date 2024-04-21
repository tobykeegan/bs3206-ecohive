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
      role: 'generic',
      text: 'Points Earned',
    },
    {
      id: 'Level-Chip',
      role: 'generic',
      text: 'Level',
    },
    {
      id: 'points-earned',
      role: 'heading',
      text: 'Points Earned',
    },
    {
      id: 'points-needed',
      role: 'paragraph',
      text: 'Points Until Level Up!',
    },
    {
      id: 'personal-impact',
      role: 'paragraph',
      text: 'Your personal impact has offset:',
    },
    {
      id: 'Leaderboard-Card',
      role: 'generic',
      text: 'Leaderboard',
    },
    {
      id: 'leaderboard-heading',
      role: 'heading',
      text: 'Leaderboard',
    },
    {
      id: 'Leaderboard',
      role: 'table',
      text: 'Position',
    },
    {
      id: 'Badges-Card',
      role: 'generic',
      text: 'Badges',
    },
    {
      id: 'badges-heading',
      role: 'heading',
      text: 'Badges',
    },
  ];

  components.forEach((component) => {
    test(`Check visibility of '${component.id}'`, async ({ page }) => {
      await expect(page.getByTestId(component.id)).toBeVisible();
    });
  });
});
