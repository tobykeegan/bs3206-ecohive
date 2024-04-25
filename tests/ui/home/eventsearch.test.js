import { expect, test } from '@playwright/test';

/**
 * Event search widget tests.
 * @author Jade Carino
 */

/**
 * Ensure to go to the Home Page before each test.
 */
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

const today = new Date();
const formattedDate = getTodaysDate(today);
function getTodaysDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const searchInputs = [
  {
    name: 'Location',
    type: 'text',
    placeholder: 'Winchester',
  },
  {
    name: 'Event Type',
    type: 'auto',
    placeholder: 'Demonstration, Meet Up',
  },
  {
    name: 'Attendee Limit',
    type: 'number',
    placeholder: '50',
  },
  {
    name: 'Date',
    type: 'text',
    placeholder: formattedDate,
  },
  {
    name: 'Tags',
    type: 'text',
    placeholder: 'winchester',
  },
];

test.describe('Event Search widget on Home Page visibility', () => {
  const searchLabels = [
    'Location',
    'Event Type',
    'Attendee Limit',
    'Date',
    'Tags',
  ];

  searchLabels.forEach((searchLabel) => {
    test(`Check visibility of label '${searchLabel}'`, async ({ page }) => {
      await expect(page.getByText(searchLabel, { exact: true })).toBeVisible();
    });
  });

  searchInputs.forEach((searchInput) => {
    test(`Check visibility of search input '${searchInput.name}'`, async ({
      page,
    }) => {
      await expect(
        page.getByPlaceholder(searchInput.placeholder, { exact: true }),
      ).toBeVisible();
    });
  });

  test(`Check search button is visible`, async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Search', exact: true }),
    ).toBeVisible();
  });
});

test.describe('Event Search widget on Home Page functionality', () => {
  const eventTypes = ['Demonstration', 'Meet Up', 'Clean Up', 'Education'];
  const TEXT_INPUT = 'ABC';
  const NUMBER_INPUT = '123';

  searchInputs.forEach((searchInput) => {
    test(`Check search input '${searchInput.name}' is empty on load`, async ({
      page,
    }) => {
      await expect(
        page.getByPlaceholder(searchInput.placeholder, { exact: true }),
      ).toBeEmpty();
    });

    test(`Check search input '${searchInput.name}' is editable`, async ({
      page,
    }) => {
      await expect(
        page.getByPlaceholder(searchInput.placeholder, { exact: true }),
      ).toBeEditable();
    });

    if (searchInput.type === 'text') {
      test(`Check '${searchInput.name}' can be filled with text`, async ({
        page,
      }) => {
        const inputField = await page.getByPlaceholder(
          searchInput.placeholder,
          { exact: true },
        );
        await inputField.fill(TEXT_INPUT);
        await expect(inputField).toHaveValue(TEXT_INPUT);
      });
    }

    if (searchInput.type === 'auto') {
      eventTypes.forEach((eventType) => {
        test(`Check '${searchInput.name}' can be filled with suggested option '${eventType}'`, async ({
          page,
        }) => {
          const inputField = await page.getByPlaceholder(
            searchInput.placeholder,
            { exact: true },
          );

          await inputField.click();
          await inputField.fill(eventType);
          await inputField.click();
          await expect(inputField).toHaveValue(eventType);
        });
      });
    }

    if (searchInput.type === 'number') {
      test(`Check '${searchInput.name}' can be filled with numbers`, async ({
        page,
      }) => {
        const inputField = await page.getByPlaceholder(
          searchInput.placeholder,
          { exact: true },
        );
        await inputField.fill(NUMBER_INPUT);
        await expect(inputField).toHaveValue(NUMBER_INPUT);
      });
    }
  });

  test(`Check search button is clickable`, async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Search', exact: true }),
    ).toBeEnabled();
  });
});
