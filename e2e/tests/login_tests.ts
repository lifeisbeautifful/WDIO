import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/loginPage.js';
import { STANDART_USERNAME, PASSWORD } from '../constants/credentials.js';
import { generatePassword, generateRandomString } from '../utils/generate-test-data.js';
import ProductsPage from '../pageobjects/productsPage.js';
import { BASE_URL } from '../../wdio.conf.js';
import { ENDPOINTS } from '../constants/endpoints.js';

describe('Swag Labs Login Tests', () => {
    beforeEach('Main page navigation', async () => {
        await browser.url('/');
    })

    it('[TC-0001] Valid Login', async () => {
        await LoginPage.login(STANDART_USERNAME, PASSWORD);
        await expect(browser).toHaveUrl(expect.stringContaining(ENDPOINTS.products));
    })

    it('[TC-0002] Login with invalid password', async () => {
        const randomPassword = generatePassword();
        const errorColor = '#e2231a'
        const svgErrorsQuantity = 2;

        await LoginPage.login(STANDART_USERNAME, randomPassword);
        await LoginPage.loginErrorDisplayed(); 
        await LoginPage.verifyUsernameBorderColor(errorColor);
        await LoginPage.verifyPasswordBorderColor(errorColor);  
        await LoginPage.verifySvgErrorIconsQuantity(svgErrorsQuantity);
    })

    it('[TC-0003] Login with invalid login', async () => {
        const randomLogin = generateRandomString();
        const errorColor = '#e2231a'
        const svgErrorsQuantity = 2;

        await LoginPage.login(randomLogin, PASSWORD);
        await LoginPage.loginErrorDisplayed(); 
        await LoginPage.verifyUsernameBorderColor(errorColor);
        await LoginPage.verifyPasswordBorderColor(errorColor);  
        await LoginPage.verifySvgErrorIconsQuantity(svgErrorsQuantity);
    })

    it('[TC-0004] Logout', async () => {
        const menuItemsQuantity = 4;

        await LoginPage.login(STANDART_USERNAME, PASSWORD);
        await expect(browser).toHaveUrl(expect.stringContaining(ENDPOINTS.products));

        await ProductsPage.openBurgerMenu();
        await ProductsPage.menuItemsQuantityToBe(menuItemsQuantity);
        await ProductsPage.clickOnMenuItemText('Logout');
        await expect(browser).toHaveUrl(BASE_URL );
        await LoginPage.verifyLoginInputsEmpty();
    })

})

