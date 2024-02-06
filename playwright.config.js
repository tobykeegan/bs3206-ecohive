import { devices } from '@playwright/test';

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  webServer: {
    command: `bun run ${process.env.NODE_ENV || 'dev'}`,
    port: 3000,
  },
  testDir: 'tests',
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  fullyParallel: true,
  workers: 10,

  projects: [
    {
      name: '(Desktop) Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    // 	name: "(Desktop) Firefox",
    // 	use: { ...devices["Desktop Firefox"] },
    // },
    // {
    // 	name: "(Desktop) Safari",
    // 	use: { ...devices["Desktop Safari"] },
    // },
    // {
    // 	name: "(Mobile) Chrome",
    // 	use: { ...devices["Pixel 7"] },
    // },
    {
      name: '(Mobile) Safari',
      use: { ...devices['iPhone 14'] },
    },
  ],
};

export default config;
