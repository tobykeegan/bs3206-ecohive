import { expect, test } from '@playwright/test';

/**
 *  Footer Functionality Tests
 * @author Jade Carino
 */

/**
 * Each test in this suite should use the Home Page
 * as the Footer is the same component across the site.
 */
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Footer Functionality', () => {
  const links = [
    {
      name: 'Privacy Policy',
      type: 'link',
    },
    {
      name: 'Terms of Use',
      type: 'link',
    },
    {
      name: 'Settings',
      type: 'link',
      url: '/settings',
    },
    {
      name: 'Contact',
      type: 'link',
    },
  ];

  links.forEach((link) => {
    test(`Check visibility of '${link.name}'`, async ({ page }) => {
      await expect(
        page.locator('#Footer :text-is("' + link.name + '")'),
      ).toBeVisible();
    });

    if (link.url) {
      test(`Check '${link.name}' directs to '${link.url}'`, async ({
        page,
      }) => {
        await expect(
          page.locator('#Footer :text-is("' + link.name + '")'),
        ).toHaveAttribute('href', link.url);
      });
    }
  });
});
