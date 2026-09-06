# Daraz.pk Playwright Automation

Automated UI test suite for [Daraz.pk](https://www.daraz.pk/), built with [Playwright](https://playwright.dev/) and TypeScript, following the Page Object Model (POM) design pattern.

## Project Overview

This project automates key end-to-end user workflows on Daraz.pk:

- Homepage navigation
- Product search (Electronics category)
- Brand filtering
- Price range filtering
- Product count validation
- Product details page navigation
- Free shipping availability check

## Tech Stack

- **Playwright** — browser automation and test runner
- **TypeScript** — typed test and page object code
- **Page Object Model (POM)** — page logic separated from test logic for maintainability

## Project Structure

```
├── tests/
│   └── daraz.spec.ts        # All test cases (TC-01 to TC-08)
├── pages/
│   ├── HomePage.ts          # Homepage locators & actions
│   ├── SearchResultPage.ts  # Search results, brand & price filters, product count
│   └── ProductPage.ts       # Product details page checks
├── playwright.config.ts     # Test runner configuration
└── package.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes bundled with Node.js)

## Setup

1. Clone this repository:
   ```bash
   git clone <your-repo-url>
   cd daraz-playwright-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers (if not already installed):
   ```bash
   npx playwright install
   ```

## Running the Tests

Run the entire test suite (headless):
```bash
npx playwright test
```

Run tests with the browser visible (headed mode):
```bash
npx playwright test --headed
```

Run a specific test by name:
```bash
npx playwright test --grep "TC-03"
```

Open Playwright's interactive UI mode (recommended for debugging):
```bash
npx playwright test --ui
```

Run tests in debug mode (step-by-step):
```bash
npx playwright test --debug
```

## Viewing the Test Report

After a test run, view the HTML report:
```bash
npx playwright show-report
```

## Test Cases

| ID | Description |
|---|---|
| TC-01 | Verifies the Daraz.pk homepage loads successfully |
| TC-02 | Searches for "Electronics" and verifies results page loads |
| TC-03 | Applies a brand filter and verifies it's reflected in the UI |
| TC-04 | Applies a price filter (500–5000 PKR) and verifies the result |
| TC-05 | Validates that filtered search results return more than zero products |
| TC-06 | Opens a product from the results and verifies the details page loads |
| TC-07 | Checks for a "Free Shipping" label on the product page, if available |

## Configuration Notes

- Tests currently run against **Chromium only**. Firefox and WebKit were disabled during development due to inconsistent load times against the live Daraz.pk site causing navigation timeouts. To re-enable other browsers, edit the `projects` array in `playwright.config.ts`.
- Default test timeout is set to 60 seconds in `playwright.config.ts` to accommodate occasional slow loads on the live site.
- `baseURL` is configured in `playwright.config.ts` as `https://www.daraz.pk`, so tests use relative paths (e.g. `page.goto('/')`).

## Known Limitations

- Several tests currently reference a specific brand ("Anex") and product name. Since Daraz's inventory changes over time, these tests may need to be updated if that brand/product is no longer available.
- Assertions rely on visible UI text (e.g. filter chips) rather than title tags, since Daraz's page titles were found to be inconsistent or contain typos across different pages.

## Author

Built as a learning project to practice Playwright fundamentals, locator strategy, and the Page Object Model.
