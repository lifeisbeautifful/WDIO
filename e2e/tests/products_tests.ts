import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/loginPage.js';
import { STANDART_USERNAME, PASSWORD } from '../constants/credentials.js';
import ProductsPage from '../pageobjects/productsPage.js';
import { ENDPOINTS } from '../constants/endpoints.js';
import { SortOptionValues } from '../constants/optionValues.js';

describe('Swag Labs Products Tests', () => {
    beforeEach('Login', async () => {
        await browser.url('/');
        await LoginPage.login(STANDART_USERNAME, PASSWORD);
        await expect(browser).toHaveUrl(expect.stringContaining(ENDPOINTS.products));
    })

    it('[TC-0006] Sorting', async () => {
        const prodPrices = await ProductsPage.getProductPrices();
        const prodNames = await ProductsPage.getProductNames();

        await ProductsPage.selectSortOption(SortOptionValues.lowToHight);
        await ProductsPage.verifyPricesSort(prodPrices, 'asc');

        await ProductsPage.selectSortOption(SortOptionValues.highToLow);
        await ProductsPage.verifyPricesSort(prodPrices, 'desc');

        await ProductsPage.selectSortOption(SortOptionValues.AtoZ);
        await ProductsPage.verifyNamesSort(prodNames, 'asc');

        await ProductsPage.selectSortOption(SortOptionValues.ZtoA);
        await ProductsPage.verifyNamesSort(prodNames, 'desc');
    })
})


