import { ENDPOINTS } from "../constants/endpoints";

class CheckoutComplete {
    private completeMessage = 'Thank you for your order!';

    private get completeMessageBlock() {
        return $('h2');
    }

    private get backHomeBtn() {
        return $('#back-to-products');
    }

    public async moveBackToHomePage() {
        await this.backHomeBtn.click();
        await expect(browser).toHaveUrl(expect.stringContaining(ENDPOINTS.products));
    }

    public async verifyCompleteMessageDisplays() {
        await expect(this.completeMessageBlock).toBeDisplayed();
        const completeMessageText = await this.completeMessageBlock.getText();
        expect(completeMessageText).toEqual(this.completeMessage);
    }
}

export default new CheckoutComplete();