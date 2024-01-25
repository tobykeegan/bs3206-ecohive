# Getting started with testing
Docs: https://playwright.dev/docs/writing-tests
## Writing a test

Each group of tests should be kept in their own file that must end with `.test.js`.
Inside this file, you should import the test framework, as well as any utilities you want: 
```js
import { expect, test } from "@playwright/test";
import { implemented } from "./utils";
```

I have provided a function called `implmented` which allows you to skip tests if their functionality is not yet, well, implemented. 
The caveat of this marker is that it will not allow you to skip the test if it is a production build.

Tests can be grouped together inside a file using `test.describe` to keep a tidy structure. 
```js

test.describe("Test Suite 1", ()=>{

		test("Test Case 1", async ({ page }) => {
			await page.goto("/home");
			await expect(some.component).toBeVisible();
		});

		test("Test Case 2", async ({ page }) => {

            implemented(false);             // not yet implemented

			await page.goto("/settings");
			await expect(some.component).toBeVisible();
		});
})
```

Take a look at the `navbar.test.js` file for a real-life example of programatically generating tests. In there, a list of pages that should and should not have a nav bar was defined, 
and test cases generated for each of those pages. To run your tests against a dev server, simply issue `bun run test`
```sh
❯ bun run test
$ bun test:dev
$ bun x playwright test
[WebServer] $ next dev

Running 7 tests using 5 workers

  ✓  1 navbar.test.js:19:7 › Navbar visibility › Visible on '/settings' page (3.5s)
  ✓  2 navbar.test.js:19:7 › Navbar visibility › Visible on '/home' page (3.5s)
  ✓  3 navbar.test.js:19:7 › Navbar visibility › Visible on '/events/myevents' page (3.5s)
  ✓  4 navbar.test.js:19:7 › Navbar visibility › Visible on '/events/feed' page (3.5s)
  -  5 navbar.test.js:26:7 › Navbar visibility › Not visible on '/' page
  -  6 navbar.test.js:26:7 › Navbar visibility › Not visible on '/login' page
  -  7 navbar.test.js:26:7 › Navbar visibility › Not visible on '/register' page

  3 skipped
  4 passed (5.2s)
  ```

  If you want to run the tests exactly how they'll be run on the build, simply issue 
  ```sh
  bun run test:prod
  ```

  This will force a full production build of the website, and run the tests against that. Remember, any non-implemented features won't be skipped this time!
  ```sh
    3 failed
    navbar.test.js:26:7 › Navbar visibility › Not visible on '/' page ──────────────────────────────
    navbar.test.js:26:7 › Navbar visibility › Not visible on '/login' page ─────────────────────────
    navbar.test.js:26:7 › Navbar visibility › Not visible on '/register' page ──────────────────────
    ```