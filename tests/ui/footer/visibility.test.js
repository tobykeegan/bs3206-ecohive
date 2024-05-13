import { expect, test } from '@playwright/test';

/**
 * Footer visibility tests.
 * @author Jade Carino
 */
test.describe('Footer visibility', () => {
  const pages = {
    visible: ['/', '/settings', '/events/discover', '/impact'],
    hidden: ['/login', '/register'],
  };

  /**
   * Check that the footer is visible on the correct pages
   * @author Jade Carino
   */
  pages.visible.forEach((url) => {
    test(`Visible on '${url}' page`, async ({ page }) => {
      await page.goto(url);
      await expect(page.locator('#Footer-Div')).toBeVisible();
    });
  });

  /**
   * Check the footer is hidden on the correct pages.
   * @author Jade Carino
   */
  pages.hidden.forEach((url) => {
    test(`Not visible on '${url}' page`, async ({ page }) => {
      await page.goto(url);
      await expect(page.locator('#Footer-Div')).not.toBeVisible();
    });
  });
});
