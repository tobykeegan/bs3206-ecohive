import { devices } from '@playwright/test';
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  webServer: {
    command: 'bun run start',
    port: 3000,
    timeout: (parseInt(process.env.WEB_TIMEOUT) || 360) * 1000,
    url: 'http://0.0.0.0:3000',
    reuseExistingServer: Boolean(process.env.CI),
  },
  testDir: 'tests',
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  fullyParallel: true,
  workers: parseInt(process.env.TEST_WORKERS) || 2,
  timeout: (parseInt(process.env.TEST_TIMEOUT) || 60) * 1000,
  expect: {
    timeout: (parseInt(process.env.TEST_EXPECT_TIMEOUT) || 30) * 1000,
  },

  projects: [
    { name: 'setup', testMatch: /.*\.setup\.js/, teardown: 'teardown' },
    { name: 'teardown', testMatch: /.*\.teardown\.js/ },
    {
      name: '(Desktop) Chrome',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: '(Mobile) Safari',
      use: {
        ...devices['iPhone 14'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
