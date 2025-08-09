import { ENDPOINTS } from "../constants/endpoints";
import { getPriceInDigits } from "../utils/normalizePriceValue";

class OverviewPage {

    private get totalPriceLabel() {
        return $('.summary_subtotal_label');
    }

    private get finishBtn() {
        return $('#finish');
    }

    public async verifyTotalPrice(totalExpected: number) {
        const totalPriceText = await this.totalPriceLabel.getText();
        expect(getPriceInDigits([totalPriceText])[0]).toEqual(totalExpected);
    }

    public async clickOnFinishBtn() {
        await this.finishBtn.click();
    }

    public async finishCheckout() {
        await this.clickOnFinishBtn();
        await expect(browser).toHaveUrl(expect.stringContaining(ENDPOINTS.checkout_complete));
    }
}

export default new OverviewPage();