import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/loginPage.js';
import { STANDART_USERNAME, PASSWORD } from '../constants/credentials.js';
import ProductsPage from '../pageobjects/productsPage.js';
import { ENDPOINTS, SOCIAL_MEDIA } from '../constants/endpoints.js';

describe('Swag Labs Footer Tests', () => {
    beforeEach('Login', async () => {
        await browser.url('/');
        await LoginPage.login(STANDART_USERNAME, PASSWORD);
        await expect(browser).toHaveUrl(expect.stringContaining(ENDPOINTS.products));
    })

    SOCIAL_MEDIA.forEach(({name, url}) => {
        it(`[TC-0007] ${name} footer link`, async () => {
            await ProductsPage.openSocialMediaPage(name, url);
        })
    })
    
})


