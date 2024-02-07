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
