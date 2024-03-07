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
 * Generates a random string of characters [a-z]
 * @author Alec Painter
 * @param {int} length
 * @returns {string}
 */
export const randomString = (length) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const charsLen = chars.length;
  let res = '';
  let i = 0;
  while (i < length) {
    res += chars.charAt(Math.floor(Math.random() * charsLen));
    i += 1;
  }
  return res;
};

/**
 * Get a cookie from the page by its name
 * @author Alec Painter
 * @param {import('@playwright/test').Page} page
 * @param {String} name
 * @returns {Object} cookie
 */
export const getCookie = async (page, name) => {
  const cookies = await page.context().cookies();
  let c = cookies.filter((obj) => {
    return obj.name === name;
  });

  return c.length == 0 ? null : c;
};
