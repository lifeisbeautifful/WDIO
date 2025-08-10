import { $, $$ } from '@wdio/globals'
import { expect } from 'expect-webdriverio';
import { ENDPOINTS } from '../constants/endpoints';
import { MenuOptionValues, SortDirection, SortOptionValues } from '../constants/optionValues';
import { getRandomElement } from '../utils/random';
import { getPriceInDigits } from '../utils/normalizePriceValue';

class ProductsPage {

    private get menuBtn() {
        return $('#react-burger-menu-btn');
    }

    private get menuItems() {
        return $$('.bm-item.menu-item');
    }

    private get menuWrapper() {
        return $('.bm-menu-wrap')
    }

    private get itemsContainer() {
        return $('#inventory_container');
    }

    private get cartBtn() {
        return $('.shopping_cart_link');
    }

    private get prices() {
        return $$('div.inventory_item_price');
    }

    private get cartCounter() {
        return $('span.shopping_cart_badge');
    }

    private get itemNames() {
        return $$('div.inventory_item_name ');
    }

    private get products() {
        return $$('.inventory_item');
    }

    private addButton(productName: string) {
        const namePart = productName.toLowerCase().replace(/ /g, '-');
        return $(`button[id='add-to-cart-${namePart}']`);
    }

    private socialMediaLink(name: string) {
        return $(`[data-test="social-${name}"]`);
    }

    private get sortSelect() {
        return $('.product_sort_container');
    }

    private get activeSortOption() {
        return $('span.active_option');
    }

    public async openBurgerMenu() {
        await this.menuBtn.click();
        await expect(this.menuWrapper).toHaveAttribute('aria-hidden', 'false');
    }

    public async verifyCartIsEmpty() {
        await expect(this.cartCounter).not.toBeExisting();
    }

    public async menuItemsQuantityToBe(number: number) {
        await expect(this.menuItems).toBeElementsArrayOfSize(number);
    }

    public async clickOnMenuItemText(text: MenuOptionValues) {
        //await browser.setWindowSize(1280, 720);

        await browser.waitUntil(async () => {
            const items = await this.menuItems;
            return await items.length > 0;
        }, { timeout: 5000, timeoutMsg: 'Menu items did not appear' });

        const items = await this.menuItems;
        for (const item of items) {
            const itemText = (await item.getText()).trim();
            console.log('Menu item text:', itemText);
            if (itemText === text) {
                await item.click();
                return;
            }
        }

        throw new Error(`${text} was not found`);
    }

    public async addProductToCart(name: string) {
        await this.addButton(name).click();
    }

    public async getCartQuantity() {
        if (await this.cartCounter.isExisting()) {
            const text = await this.cartCounter.getText();
            return parseInt(text, 10);
        }
        return 0; 
   }

   public async addProductAndCheckIncrement(productName: string) {
        const beforeCount = await this.getCartQuantity();

        await this.addProductToCart(productName); 

        await browser.waitUntil(async () => {
            const afterCount = await this.getCartQuantity();
            return afterCount === beforeCount + 1;
            }, 
            {
                timeout: 5000,
                timeoutMsg: 'Cart quantity did not increment after adding product'
            });
    }

    public async itemsContainerToBeVisible() {
        await expect(this.itemsContainer).toBeDisplayed();
    }

    public async openCart() {
        await this.cartBtn.click();
        await expect(browser).toHaveUrl(expect.stringContaining(ENDPOINTS.cart));
    }

    public async openSocialMediaPage(name: string, linkUrl: string) {
        await this.socialMediaLink(name).click();

        await browser.waitUntil(async () => {
            const handles = await browser.getWindowHandles();
            return handles.length > 1;
        }, {timeout: 10000});

        const handles = await browser.getWindowHandles();
        let found = false;

        for (const handle of handles) {
            await browser.switchToWindow(handle);

            await browser.waitUntil(async () => {
                const url = await browser.getUrl();
                return url !== 'about:blank';
            }, { timeout: 10000 });

            const url = await browser.getUrl();
            if (url === linkUrl) {
                await expect(browser).toHaveUrl(linkUrl);
                found = true;
                break;
            }
        }

        if (!found) {
            throw new Error(`Page with URL "${linkUrl}" not found`);
        }
    }

    public async getProductPrices() {
        const itemPrices = await this.prices.map(async p => await p.getText());
        return getPriceInDigits(itemPrices);
    }

    public async getProductNames() {
        return await this.itemNames.map(async n => await n.getText());
    }

    public async getRandomProductNameAndPrice() {
        const randomProduct = await getRandomElement(this.products);
        const prodName = await randomProduct.$('.inventory_item_name ').getText();
        const prodPrice = await randomProduct.$('div.inventory_item_price').getText();
        return { name: prodName, price: getPriceInDigits([prodPrice])[0]};
    }

    public async selectSortOption(option: SortOptionValues) {
        await this.sortSelect.click();
        await this.sortSelect.selectByVisibleText(option);
        await expect(this.activeSortOption).toHaveText(option.toString());
    }

    public async verifyPricesSort(pricesBeforeSort: number[], sortType: SortDirection) {
        const pricesAfterSort = await this.getProductPrices();
        const sortedBeforePrices = [...pricesBeforeSort].sort((a,b) => 
            sortType === 'asc' ? a - b : b - a);

        await expect(pricesAfterSort).toEqual(sortedBeforePrices);
    }

    public async verifyNamesSort(namesBeforeSort: string[], sortType: SortDirection) {
        const namesAfterSort = await this.getProductNames();
        const sortedBeforeNames = [...namesBeforeSort].sort((a,b) => 
            sortType === 'asc' ? a.localeCompare(b, undefined, { sensitivity: 'base' }) 
                : b.localeCompare(a, undefined, { sensitivity: 'base' })
            );

        await expect(namesAfterSort).toEqual(sortedBeforeNames);
    }

}

export default new ProductsPage();