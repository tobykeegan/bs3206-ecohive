import { expect, test } from "@playwright/test";
import { implemented } from "./utils";
/* 
	Test Navbar visibility.
	This group of tests checks each page listed under 

*/

test.describe("Navbar visibility", () => {
  const pages = {
    visible: ["/home", "/settings", "/events/feed", "/events/myevents"],
    hidden: [
      "/", // shouldn't ever be here!
      "/login",
      "/register",
    ],
  };
  pages.visible.forEach((url) => {
    test(`Visible on '${url}' page`, async ({ page }) => {
      await page.goto(url);
      await expect(page.locator("nav", { name: "navbar" })).toBeVisible();
    });
  });

  pages.hidden.forEach((url) => {
    test(`Not visible on '${url}' page`, async ({ page }) => {
      implemented(false);

      await page.goto(url);
      await expect(page.locator("nav", { name: "navbar" })).not.toBeVisible();
    });
  });
});
