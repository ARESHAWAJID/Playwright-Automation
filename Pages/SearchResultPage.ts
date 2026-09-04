import { test, expect, Page, Locator } from '@playwright/test';
export class SearchResultPage{
    readonly page:Page;
    readonly priceMin: Locator;
    readonly priceMax: Locator;
    readonly priceBtn : Locator;
    readonly productLinks:Locator;
   readonly firstProductLink: Locator;
    constructor(page: Page){
        this.page = page;
       this.priceMin = page.getByRole('spinbutton', { name: 'Min' });
       this.priceMax = page.getByRole('spinbutton', { name: 'Max' });
       this.priceBtn = page.getByRole('button').nth(2);
       this.productLinks = page.locator('[data-qa-locator="product-item"]');
        this.firstProductLink = page.locator('a[href*="/products/"]').first();

    }
     async goto(keyword: string)
      {
    await this.page.goto(`/catalog/?q=${keyword}`);
     }
    
    async applyBrandFilter(brand : string)
    {
       const brandlink =  this.page.getByRole('link', { name: brand })
       brandlink.click();
    }
    async verifyBrandFilter(brand : string)
   {
          await expect(this.page.getByText(`Brand: ${brand}`)).toBeVisible();
   }

   async applyPriceFilter(min:string , max:string)
   {
     await this.priceMin.click();
    await this.priceMin.fill(min);
    await this.priceMax.click();
    await this.priceMax.fill(max);
    await this.priceBtn.click();
   }
   async verifyPriceFilter(min:string , max:string)
   {
    await expect(this.page.getByText(`Price: ${min}-${max}`)).toBeVisible();
      await expect(this.page).toHaveURL(new RegExp(`${min}-${max}`, 'i'));
   }
   async getProductCount(): Promise<number> {
  return await this.productLinks.count();
}
async openFirstProduct() {
    await this.firstProductLink.click();
  }
}