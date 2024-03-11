const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default; // 1

const pages = [
  '/',
  '/settings',
  '/events/create',
  '/events/discover',
  '/events/history',
  '/events/upcoming',
  '/login',
  '/register',
];

pages.forEach((url) => {
  test(`Accessibility checks for '${url}' page`, async ({ page }) => {
    await page.goto(url);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
