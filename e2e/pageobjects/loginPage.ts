import { $, $$ } from '@wdio/globals'

class LoginPage {
    private errorText = 'Epic sadface: Username and password do not match any user in this service';

    private get usernameInput() {
        return $('#user-name');
    }

    private get passwordInput() {
        return $('#password');
    }

    private get loginBtn() {
        return $('#login-button');
    }

    private get loginError() {
        return $('h3[data-test="error"]');
    }

    private get svgIcons() {
        return $$('svg[data-icon="times-circle"]');
    }

    public async login(username: string, password: string): Promise<void>{
        await this.usernameInput.setValue(username);
        const value = await this.usernameInput.getValue();
        expect(value).toBe(username);

        await this.passwordInput.setValue(password);
        const type = await this.passwordInput.getAttribute('type');
        await expect(type).toBe('password');

        await this.loginBtn.click();
    }

    public async loginErrorDisplayed(): Promise<void> {
        await expect(this.loginError).toBeDisplayed();
        await expect(this.loginError).toHaveText(this.errorText)
    }

    public async verifyUsernameBorderColor(color: string) {
        const borderColor = await this.usernameInput.getCSSProperty('border-bottom-color');   
        expect(borderColor.parsed.hex).toBe(color);
    }

    public async verifyPasswordBorderColor(color: string) {
        const borderColor = await this.passwordInput.getCSSProperty('border-bottom-color');   
        expect(borderColor.parsed.hex).toBe(color);
    }

    public async verifySvgErrorIconsQuantity(iconsNumber: number) {
        await expect(this.svgIcons).toBeElementsArrayOfSize(iconsNumber);
    }

    public async verifyLoginInputsEmpty() {
        await expect(await this.usernameInput.getValue()).toBe('');
        await expect(await this.passwordInput.getValue()).toBe('');
    }
}

export default new LoginPage();