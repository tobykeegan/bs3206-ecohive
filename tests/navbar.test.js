import { expect, test } from "@playwright/test";
import { implemented } from "./utils";

/**
 *  Navbar visibility tests
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

	/**
	 * Check that the navbar is visible on the correct pages
	 */
	pages.visible.forEach((url) => {
		test(`Visible on '${url}' page`, async ({ page }) => {
			await page.goto(url);
			await expect(page.locator("nav", { name: "navbar" })).toBeVisible();
		});
	});

	/**
	 * Check the navbar is hidden on the correct pages.
	 * @not_yet_implemented
	 */
	// pages.hidden.forEach((url) => {
	// 	test(`Not visible on '${url}' page`, async ({ page }) => {
	// 		implemented(false);

	// 		await page.goto(url);
	// 		await expect(
	// 			page.locator("nav", { name: "navbar" }),
	// 		).not.toBeVisible();
	// 	});
	// });
});
