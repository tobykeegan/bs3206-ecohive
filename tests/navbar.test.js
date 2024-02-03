import { expect, test } from "@playwright/test";
import { implemented } from "./utils";

/**
 *  Navbar visibility tests.
 * @author Toby Keegan
 */
test.describe("Navbar visibility", () => {
	const pages = {
		visible: ["/", "/settings", "/events/feed", "/events/myevents"],
		hidden: ["/login", "/register"],
	};

	/**
	 * Check that the navbar is visible on the correct pages
	 * @author Toby Keegan
	 */
	pages.visible.forEach((url) => {
		test(`Visible on '${url}' page`, async ({ page }) => {
			await page.goto(url);
			await expect(page.locator("nav", { name: "navbar" })).toBeVisible();
		});
	});

	/**
	 * Check the navbar is hidden on the correct pages.
	 * @author Toby Keegan
	 */
	pages.hidden.forEach((url) => {
		test(`Not visible on '${url}' page`, async ({ page }) => {
			await page.goto(url);
			await expect(
				page.locator("nav", { name: "navbar" }),
			).not.toBeVisible();
		});
	});
});
