import { ENDPOINTS } from "../constants/endpoints";

class CheckoutPage {

    private get checkoutBlock() {
        return $('.checkout_info_wrapper');
    }

    private get firstNameField() {
        return $('#first-name');
    }

    private get lastNameField() {
        return $('#last-name');
    }

    private get postalCodeField() {
        return $('#postal-code');
    }

    private get continueBtn() {
        return $('#continue');
    }

    public async verifyCheckoutBlockDisplays() {
        await expect(this.checkoutBlock).toBeDisplayed();
    }

    public async enterFirstName(firstName: string) {
        await this.firstNameField.setValue(firstName);
        const value = await this.firstNameField.getValue();
        expect(value).toBe(firstName);
    }

    public async enterLastName(lastName: string) {
        await this.lastNameField.setValue(lastName);
        const value = await this.lastNameField.getValue();
        expect(value).toBe(lastName);
    }

    public async enterPostalCode(postalCode: string) {
        await this.postalCodeField.setValue(postalCode);
        const value = await this.postalCodeField.getValue();
        expect(value).toBe(postalCode);
    }

    public async clickOnContinueBtn() {
        await this.continueBtn.click();
    }

    public async performCheckout(firstName: string, lastName: string, postalCode: string) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterPostalCode(postalCode);
        await this.clickOnContinueBtn();
        await expect(browser).toHaveUrl(expect.stringContaining(ENDPOINTS.checkout_overview));
    }
}

export default new CheckoutPage();