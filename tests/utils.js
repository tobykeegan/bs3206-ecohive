import { test } from "@playwright/test";

/**
 * Skips the test if the functionality is not implemented
 * @param {boolean} implemented
 */
export const implemented = (implemented) => {
  if (implemented === false && process.env.NODE_ENV != "production") {
    test.skip(true, "Not implemented");
  }
};
