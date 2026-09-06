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
- No-results (empty state) search handling

## Tech Stack

- **Playwright** — browser automation and test runner
- **TypeScript** — typed test and page object code
- **Page Object Model (POM)** — page logic separated from test logic for maintainability
- **GitHub Actions** — CI pipeline for running the suite on demand

## Project Structure

```
├── tests/
│   └── daraz.spec.ts        # All test cases (TC-01 to TC-08)
├── Pages/
│   ├── HomePage.ts          # Homepage locators & actions
│   ├── SearchResultPage.ts  # Search results, brand & price filters, product count, no-results check
│   └── ProductPage.ts       # Product details page checks
├── .github/workflows/
│   └── playwright.yml       # CI workflow — manually triggered (see Configuration Notes)
├── playwright.config.ts     # Test runner configuration
└── package.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes bundled with Node.js)

## Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/ARESHAWAJID/Playwright-Automation.git
   cd Playwright-Automation
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
| TC-08 | Searches for a gibberish keyword and verifies the "no results" empty state is shown |

## Configuration Notes

- Tests currently run against **Chromium only**. Firefox and WebKit were disabled during development due to inconsistent load times against the live Daraz.pk site causing navigation timeouts. To re-enable other browsers, uncomment the relevant entries in the `projects` array in `playwright.config.ts`.
- Default test timeout is set to 120 seconds in `playwright.config.ts` to accommodate occasional slow loads on the live site.
- `baseURL` is configured in `playwright.config.ts` as `https://www.daraz.pk`, so tests use relative paths (e.g. `page.goto('/')`).
- A GitHub Actions workflow (`.github/workflows/playwright.yml`) is included and can be run manually from the **Actions** tab (**Run workflow**). It's set to manual trigger (`workflow_dispatch`) rather than running on every push/PR, since Daraz.pk's anti-bot verification system tends to block traffic from GitHub-hosted runners' shared IPs — see Known Limitations below.

## Known Limitations

- **Anti-bot detection on shared cloud IPs.** Daraz.pk (part of Alibaba Group) uses a bot-detection/verification system ("Baxia") that can present a blocking verification overlay to traffic from datacenter IP ranges, such as GitHub Actions runners. This is a security measure on Daraz's side, not a defect in the test suite — the same tests run reliably against a normal residential IP (e.g. locally). For this reason, local execution (`npx playwright test`) is the primary way to verify this suite, and the CI workflow is set to manual trigger rather than auto-running on every commit.
- Several tests reference a specific brand ("Anex") and product. Since Daraz's inventory changes over time, these tests may need to be updated if that brand/product is no longer available.
- Assertions favor visible UI text (e.g. filter chips, "no results" messages) over page title tags, since Daraz's page titles were found to be inconsistent or contain typos across different pages.
- Locators are built primarily on accessible roles/text rather than CSS classes, per Playwright's recommended best practices, to reduce breakage from front-end styling changes.

## Author

Built as a learning project to practice Playwright fundamentals, locator strategy, and the Page Object Model.
