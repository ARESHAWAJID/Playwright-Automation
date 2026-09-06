import { test, expect, Page, Locator } from '@playwright/test';
export class HomePage{
readonly page : Page;
readonly searchBox : Locator;
readonly searchBtn : Locator;

constructor(page : Page)
{
    this.page = page;
    this.searchBox = page.getByRole('searchbox', { name: 'Search in Daraz' });
    this.searchBtn = page.getByRole('link', { name: 'SEARCH' });
}

async gotoHomePage()
{
    await this.page.goto('/');
}
async verifyHomePageLoaded()
{
       await expect(this.page).toHaveTitle(/Daraz/i);
       await expect(this.page).toHaveURL(/daraz\.pk/);
}
async searchFor(keyword : string)
{
    await this.searchBox.click();
    await this.searchBox.fill(keyword);
    await this.searchBtn.click();
}
async verifySearch(keyword : string)
{
    await expect(this.page).toHaveTitle(new RegExp(keyword, 'i'));
    await expect(this.page).toHaveURL(new RegExp(keyword, 'i'));
}

}