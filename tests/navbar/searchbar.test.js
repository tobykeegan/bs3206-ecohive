import { expect, test } from "@playwright/test";
import { implemented } from "../utils";
import { metadata } from "../../src/app/global.vars";
/**
 *  Navbar Search Functionality Tests
 * @author Toby Keegan
 */
/**
 * Each test in this suite just uses the homepage
 * as the Navbar is the same component across the whole
 * website.
 */
test.beforeEach(async ({ page }) => {
	await page.goto("/");
});

test.describe("Persistent Searchbar Functionality", () => {
	test("Search bar is empty on load", async ({ page }) => {
		const searchbar = await page.getByPlaceholder("Search");

		// we initially expect the searchbar to be empty
		await expect(searchbar).toBeEmpty();
	});

	test("Search bar can have text input", async ({ page }) => {
		const searchbar = await page.getByPlaceholder("Search");

		const TEST_INPUT = "Hello, world!";

		await searchbar.fill(TEST_INPUT);

		await expect(searchbar).toHaveValue(TEST_INPUT);
	});
});
