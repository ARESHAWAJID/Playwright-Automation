import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage'; 
import { SearchResultPage } from '../Pages/SearchResultPage';
import { ProductPage } from '../Pages/ProductPage';
test('TC-01: Navigates to the Daraz.pk homepage successfully',async ({page})=>{
  const homepage = new HomePage(page);
  await homepage.gotoHomePage();
  await homepage.verifyHomePageLoaded();
})
test('TC-02: Search for Electronics Category',async ({page})=>{
    const homepage = new HomePage(page);
    await homepage.gotoHomePage();
    await homepage.searchFor('Electronics');
    await expect(page).toHaveTitle(/Electronics/i);
    await expect(page).toHaveURL(/electronics/i);
})


test('TC-03: Apply and verify for Brand filter',async ({page})=>{
  const searchResultPage = new SearchResultPage(page);
  await searchResultPage.goto('electronics');
    await searchResultPage.applyBrandFilter('Anex');
    await searchResultPage.verifyBrandFilter('Anex');
})
test('TC-04: Apply and verify for Price filter(500-5000)',async ({page})=>{
    
    const searchResultPage = new SearchResultPage(page);
  await searchResultPage.goto('electronics');
  await searchResultPage.applyPriceFilter('500','5000');
  await searchResultPage.verifyPriceFilter('500','5000');
   

})

     test('TC-05: Validate product count is greater than zero', async ({ page }) => {
  const searchResultPage = new SearchResultPage(page);
  await searchResultPage.goto('electronics');
  await searchResultPage.applyBrandFilter('Anex');
  await searchResultPage.verifyBrandFilter('Anex');

  const count = await searchResultPage.getProductCount();
  console.log(`Found ${count} products`);
  expect(count).toBeGreaterThan(0);
});
     
     test('TC-06: Product page opens successfully', async ({ page }) => {
  const searchResultPage = new SearchResultPage(page);
  const productPage = new ProductPage(page);

  await searchResultPage.goto('electronics');
  await searchResultPage.applyBrandFilter('Anex');
  await searchResultPage.verifyBrandFilter('Anex');
  await searchResultPage.openFirstProduct();

  await productPage.verifyProductPageLoaded();
});
    test('TC-07: Verify Free Shipping availability', async ({ page }) => {
  const searchResultPage = new SearchResultPage(page);
  const productPage = new ProductPage(page);

  await searchResultPage.goto('electronics');
  await searchResultPage.applyBrandFilter('Anex');
  await searchResultPage.verifyBrandFilter('Anex');
  await searchResultPage.openFirstProduct();

  await productPage.verifyProductPageLoaded();
  await productPage.verifyFreeShippingIfAvailable();
});
    
     