import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/loginPage.js';
import ProductsPage from '../pageobjects/productsPage.js';
import CartPage from '../pageobjects/cartPage.js';
import OverviewPage from '../pageobjects/overviewPage.js';
import { STANDART_USERNAME, PASSWORD } from '../constants/credentials.js';
import { ENDPOINTS } from '../constants/endpoints.js';
import CheckoutPage from '../pageobjects/checkoutPage.js';
import { fakeCheckoutData } from '../utils/generate-test-data.js';
import CheckoutCompletePage from '../pageobjects/checkoutCompletePage.js';

describe('Swag Labs Checkout Tests', () => {
    beforeEach('Login', async () => {
        await browser.url('/');
        await LoginPage.login(STANDART_USERNAME, PASSWORD);
        await expect(browser).toHaveUrl(expect.stringContaining(ENDPOINTS.products));
    })

    it('[TC-0008] Valid Checkout', async () => {
        const product = await ProductsPage.getRandomProductNameAndPrice();

        await ProductsPage.addProductAndCheckIncrement(product.name);
        await ProductsPage.openCart(); 
        await CartPage.verifyCartItemsNames([product.name]);
        await CartPage.openCheckoutPage();
        await CheckoutPage.verifyCheckoutBlockDisplays();
        await CheckoutPage.performCheckout(
            fakeCheckoutData.firstName,
            fakeCheckoutData.lastName,
            fakeCheckoutData.zipCode
        );

        await CartPage.verifyCartItemsNames([product.name]);
        await CartPage.verifyCartItemPrices([product.price]);
        await OverviewPage.verifyTotalPrice(product.price);
        await OverviewPage.finishCheckout();
        await CheckoutCompletePage.verifyCompleteMessageDisplays();
        await CheckoutCompletePage.moveBackToHomePage();
        await ProductsPage.itemsContainerToBeVisible();
        await ProductsPage.verifyCartIsEmpty();
    })


    // Skiped due to application bug
    it.skip('[TC-0009] Checkout without product', async () => {
        await ProductsPage.openCart(); 
        await CartPage.verifyCartPageIsEmpty();
        await CartPage.clickOnCheckoutBtn();
        await expect(browser).toHaveUrl(expect.stringContaining(ENDPOINTS.cart));
        await CartPage.verifyEmptyCartErrorDisplays();
    })

})


