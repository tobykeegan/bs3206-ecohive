import Event from '@/app/api/models/event.model';
import { test } from '@playwright/test';
import { signIn } from 'next-auth/react';

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

// function to generate a random date in the future
export function generateRandomDate() {
  let date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * 100));
  return date;
}

export function generateEvent(ownerId, asJson = false) {
  let capacity = Math.floor(Math.random() * 10000) + 1000;
  let signups = Math.floor(Math.random() * capacity);

  const validTypes = ['demonstration', 'meet-up', 'clean-up', 'education'];
  let type = validTypes[Math.floor(Math.random() * validTypes.length)];
  const event = {
    name: `Test Event ${randomString(5)}`,
    type: type,
    location: 'Playwright Park',
    description: 'Test Description',
    date: generateRandomDate(),
    creator: ownerId,
    attendance: {
      // random number between 1000 and 10000
      capacity: capacity,

      signups: signups,
    },
    points: Math.floor(Math.random() * 100) + 1,
  };
  if (asJson) return event;
  return new Event(event);
}

export const HTTP = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  IM_A_TEAPOT: 418,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_ENTITY: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NOT_EXTENDED: 510,
  NETWORK_AUTHENTICATION_REQUIRED: 511,
};
