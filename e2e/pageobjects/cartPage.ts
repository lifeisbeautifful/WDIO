import { $$ } from '@wdio/globals'
import { ENDPOINTS } from '../constants/endpoints';
import { getPriceInDigits } from '../utils/normalizePriceValue';

class CartPage {
    private emptyCartErrorMessage = 'Cart is empty';

    private get cartItemsNames() {
        return $$('.inventory_item_name');
    }

    private get cartItemPrices() {
        return $$('.inventory_item_price');
    }

    private get checkoutBtn() {
        return $('#checkout');
    }

    private get emptyCartError() {
        return $(`//*[text()='${this.emptyCartErrorMessage}']`);
    }

    public async verifyCartPageIsEmpty() {
        const length = await this.cartItemsNames.length;
        await expect(length).toBe(0);
    }

    public async verifyCartItemsNames(names: string[]) {
        const cartProducts = await this.cartItemsNames.map(async item => await item.getText());
        await expect(cartProducts).toEqual(names);
    }

    public async verifyCartItemPrices(prices: number[]) {
        const cartPrices = await this.cartItemPrices.map(async item => await item.getText());
        await expect(getPriceInDigits(cartPrices)).toEqual(prices);
    }

    public async openCheckoutPage() {
        await this.checkoutBtn.click();
        await expect(browser).toHaveUrl(expect.stringContaining(ENDPOINTS.checkout));
    }

    public async clickOnCheckoutBtn() {
        await this.checkoutBtn.click();
    }

    public async verifyEmptyCartErrorDisplays() {
        await expect(this.emptyCartError).toBeDisplayed();
    }

}

export default new CartPage();