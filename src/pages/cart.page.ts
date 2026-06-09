import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
    private readonly checkoutBtn: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueBtn: Locator;
    private readonly finishBtn: Locator;
    private readonly completeHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutBtn = page.locator('[data-test="checkout"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
        this.finishBtn = page.locator('[data-test="finish"]');
        this.completeHeader = page.locator('.complete-header');
    }

    async completeCheckoutFlow(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.checkoutBtn.click();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueBtn.click();
        await this.finishBtn.click();
    }

    async getConfirmationMessage(): Promise<string | null> {
        await this.waitForElement(this.completeHeader);
        return await this.completeHeader.textContent();
    }
}