/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  webServer: {
    command: `bun run ${process.env.NODE_ENV}`,
    port: 3000,
  },
  testDir: "tests",
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  fullyParallel: true,
};

export default config;
