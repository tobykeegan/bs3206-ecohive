const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
import { implemented } from '../utils';
const pages = [
  '/settings',
  '/events/discover',
  '/events/history',
  '/events/upcoming',
  '/login',
  '/register',
];

pages.forEach((url) => {
  // TODO: un-skip when I'm ready to deal with accessibility
  test.skip(`Accessibility checks for '${url}' page`, async ({
    page,
  }, testInfo) => {
    await page.goto(url);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
