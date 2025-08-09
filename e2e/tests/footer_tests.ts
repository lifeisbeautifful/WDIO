import { expect } from '@wdio/globals'
import { restoreStorageState, saveStorageState } from '../helpers/storage.js';
import LoginPage from '../pageobjects/loginPage.js';
import { STANDART_USERNAME, PASSWORD } from '../constants/credentials.js';
import ProductsPage from '../pageobjects/productsPage.js';
import { ENDPOINTS, SOCIAL_MEDIA } from '../constants/endpoints.js';

describe('Swag Labs Footer Tests', () => {
    before('Login', async () => {
        await browser.url('/');
        await LoginPage.login(STANDART_USERNAME, PASSWORD);
        await expect(browser).toHaveUrl(expect.stringContaining(ENDPOINTS.products));
        await saveStorageState();
    })

    SOCIAL_MEDIA.forEach(({name, url}) => {
        it(`[TC-0007] ${name} footer link`, async () => {
            const restored = await restoreStorageState();
            if(!restored) {
                await LoginPage.login(STANDART_USERNAME, PASSWORD);
                await saveStorageState();
            }
            await browser.url(ENDPOINTS.products);
            await ProductsPage.openSocialMediaPage(name, url);
        })
    })
    
})


