import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/loginPage.js';
import { STANDART_USERNAME, PASSWORD } from '../constants/credentials.js';
import ProductsPage from '../pageobjects/productsPage.js';
import { BASE_URL } from '../../wdio.conf.js';
import CartPage from '../pageobjects/cartPage.js';
import { ENDPOINTS } from '../constants/endpoints.js';

describe('Swag Labs Cart Tests', () => {
    beforeEach('Login', async() => {
        await browser.url('/');
        await LoginPage.login(STANDART_USERNAME, PASSWORD);
        await expect(browser).toHaveUrl(expect.stringContaining(ENDPOINTS.products));
    })

    it('[TC-0005] Saving the cart after logout', async () => {
        const menuItemsQuantity = 4;
        const cartItemsQuantity = 1;
        const product = await ProductsPage.getRandomProductNameAndPrice();

        await ProductsPage.addProductAndCheckIncrement(product.name);
        await ProductsPage.openBurgerMenu();
        await ProductsPage.menuItemsQuantityToBe(menuItemsQuantity);
        await ProductsPage.clickOnMenuItemText('Logout');
        await expect(browser).toHaveUrl(BASE_URL );
        await LoginPage.login(STANDART_USERNAME, PASSWORD);
        await expect(browser).toHaveUrl(expect.stringContaining(ENDPOINTS.products));
        await ProductsPage.itemsContainerToBeVisible();
        const uiCartItems = await ProductsPage.getCartQuantity();
        await expect(uiCartItems).toEqual(cartItemsQuantity); 
        await ProductsPage.openCart(); 
        await CartPage.verifyCartItemsNames([product.name]);
    })

})

