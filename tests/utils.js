import { test } from '@playwright/test';

/**
 * Skips the test if the functionality is not implemented.
 * Prevents you from skipping the test on a production build!
 * @param {boolean} implemented
 */
export const implemented = (implemented) => {
  if (implemented === false && process.env.NODE_ENV != 'production') {
    test.skip(true, 'Not implemented');
  }
};

/**
 * Generates a random string of characters [A-Za-z0-9]
 * @author Alec Painter
 * @param {int} length
 * @returns {string}
 */
export const randomString = (length) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charsLen = chars.length;
  let res = '';
  let i = 0;
  while (i < length) {
    res += chars.charAt(Math.floor(Math.random() * charsLen));
    i += 1;
  }
  return res;
};
