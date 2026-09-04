import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly shippingLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shippingLabel = page.getByText(/free\s*shipping/i);
  }

  async verifyProductPageLoaded() {
    await expect(this.page).toHaveURL(/\/products\/.*\.html/i);
  }

  async verifyFreeShippingIfAvailable() {
    const count = await this.shippingLabel.count();
    if (count > 0) {
      await expect(this.shippingLabel.first()).toBeVisible();
      console.log('Free Shipping is available for the given product');
    } else {
      console.log('Free Shipping is not available for the given product');
      expect(count).toBe(0);
    }
  }
}