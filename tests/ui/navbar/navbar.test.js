import { expect, test } from '@playwright/test';
import { implemented } from '../../utils';
import { metadata } from '../../../src/app/global.vars';
/**
 *  Navbar Functionality Tests
 * @author Toby Keegan
 */

/**
 * Each test in this suite just uses the homepage
 * as the Navbar is the same component across the whole
 * website.
 */
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Navbar Functionality', () => {
  /**
   * The collapsible menus that appear on large screens,
   * but are hidden in the sidebar on mobile devices.
   * This is the default behaviour of a navbar item.
   */
  const menus = [
    {
      name: 'Events',
      desktop: true,
      mobile: true,
      type: 'button',
      url: null,
      submenus: [
        {
          name: 'Discover Events',
          url: '/events/discover',
          type: 'link',
        },
        {
          name: 'My Upcoming Events',
          url: '/events/upcoming',
          type: 'link',
        },
        {
          name: 'My Past Events',
          url: '/events/history',
          type: 'link',
        },
      ],
    },
    {
      name: 'My Impact',
      desktop: true,
      mobile: true,
      type: 'link',
      submenus: [],
    },
    {
      name: 'My Account',
      desktop: false,
      mobile: true,
      type: 'button',
      submenus: [
        {
          name: 'Settings',
          url: '/settings',
          type: 'link',
        },
        {
          name: 'Sign out',
          url: null,
          type: 'button',
        },
      ],
    },
    {
      name: 'Settings icon',
      desktop: true,
      mobile: false,
      url: '/settings',
      type: 'link',
      submenus: [],
    },
    {
      name: 'Sign out icon',
      desktop: true,
      mobile: false,
      url: null,
      type: 'button',
      submenus: [],
    },
  ];

  menus.forEach((menu) => {
    /**
     * Test that on a desktop, all the navbar options are visible,
     * and that they are NOT visible on mobile. This is the expected
     * behaviour as they will be hidden in a sidebar that can be
     * toggled.
     */
    test(`Check visibility of '${menu.name}'`, async ({ page, isMobile }) => {
      /**
       * Check to see if this is a mobile browser, and
       * assert that we have (correctly) collapsed the navbar
       * so no options are visible.
       */
      const navbar = await page.getByRole(menu.type, {
        name: menu.name,
        exact: true,
      });

      if (isMobile) {
        await expect(navbar).not.toBeVisible();
      } else {
        /**
         * If this is a desktop, expect the object to
         * be visible.
         */
        if (menu.desktop) {
          await expect(navbar).toBeVisible();
        } else {
          await expect(navbar).not.toBeVisible();
        }
      }
    });

    /**
     * Test that on a mobile device, you can click the sidebar
     * toggle button, and all the same options from the navbar
     * are visible.
     */
    test(`Check sidebar visibility of '${menu.name}'`, async ({
      page,
      isMobile,
    }) => {
      if (isMobile) {
        // First we must click the toggle
        await page.getByLabel('Toggle navigation').click();
        // Now check the contents are visible
        if (menu.mobile) {
          await expect(
            page.getByRole(menu.type, {
              name: menu.name,
              exact: true,
            }),
          ).toBeVisible();
        } else {
          await expect(
            page.getByRole(menu.type, {
              name: menu.name,
              exact: true,
            }),
          ).not.toBeVisible();
        }
      }
    });
    /**
     * Test that every menu item has the expected href attribute,
     * and that clicking it correctly directs the user to the expected
     * page.
     */
    if (menu.url) {
      test(`Menu '${menu.name}' directs to'${menu.url}'`, async ({
        page,
        isMobile,
      }) => {
        if (isMobile) {
          // We're on a mobile device, so click the sidebar toggle
          await page.getByLabel('Toggle navigation').click();
        }
        if ((isMobile && menu.mobile) || (!isMobile && menu.desktop)) {
          const submenu = await page
            .getByRole(menu.type, {
              name: menu.name,
              exact: true,
            })
            // Now click the menu to expand its sub-menus
            .click();
          await expect(
            page.getByRole(menu.type, {
              name: menu.name,
              exact: true,
            }),
          ).toHaveAttribute('href', menu.url);
        }
      });
    }

    /**
     * Test that every dropdown menu item shows the correct links.
     * This test is applicable to desktop AND mobile, as it will expand
     * the sidebar automatically and check for the same options.
     */
    menu.submenus.forEach((submenu) => {
      test(`Check visibility of submenu '${submenu.name}' under '${menu.name}' dropdown`, async ({
        page,
        isMobile,
      }) => {
        if (isMobile) {
          // We're on a mobile device, so click the sidebar toggle
          await page.getByLabel('Toggle navigation').click();
        }
        // Now click the menu to expand its sub-menus
        if ((isMobile && menu.mobile) || (!isMobile && menu.desktop)) {
          await page
            .getByRole(menu.type, {
              name: menu.name,
              exact: true,
            })
            .click();

          // Assert that the submenu is visible
          await expect(
            page.locator('#NavbarContent :text-is("' + submenu.name + '")'),
          ).toBeVisible();
        }
      });

      /**
       * Test that every menu item has the expected href attribute,
       * and that clicking it correctly directs the user to the expected
       * page.
       */
      if (submenu.url) {
        test(`Submenu '${submenu.name}' directs to '${submenu.url}'`, async ({
          page,
          isMobile,
        }) => {
          if (isMobile) {
            // We're on a mobile device, so click the sidebar toggle
            await page.getByLabel('Toggle navigation').click();
          }
          // Now click the menu to expand its sub-menus
          if ((isMobile && menu.mobile) || (!isMobile && menu.desktop)) {
            await page
              .getByRole(menu.type, {
                name: menu.name,
                exact: true,
              })
              .click();
            // check the href
            await expect(
              page.locator('#NavbarContent :text-is("' + submenu.name + '")'),
            ).toHaveAttribute('href', submenu.url);
          }
        });
      }
    });
  });

  /**
   * Test that the search bar is ALWAYS visible. The expected behaviour
   * is that the search bar, and the "Create Event" button are always visible
   */
  test('Search bar always visible', async ({ page }) => {
    await expect(page.getByPlaceholder('Search')).toBeVisible();
    await expect(page.getByLabel('Search events')).toBeVisible();
    await expect(page.getByLabel('Create Event')).toBeVisible();
  });
});
