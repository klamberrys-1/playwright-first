import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
    // Definición de Selectores (Atributos)
    private readonly pageTitle: Locator;
    private readonly firstProductAddToCartBtn: Locator;
    private readonly shoppingCartBadge: Locator;
    private readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        super(page); // Llama al constructor de BasePage
        this.pageTitle = page.locator('.title');
        // Usamos selectores basados in texto o atributos de datos para que sean estables
        this.firstProductAddToCartBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
    }

    // Acciones Lógicas (Métodos)
    async isPageLoaded(): Promise<boolean> {
        await this.waitForElement(this.pageTitle);
        return await this.pageTitle.isVisible();
    }

    async addFirstProductToCart(): Promise<void> {
        await this.firstProductAddToCartBtn.click();
    }

    async getCartItemsCount(): Promise<string | null> {
        if (await this.shoppingCartBadge.isVisible()) {
            return await this.shoppingCartBadge.textContent();
        }
        return '0';
    }

    async goToCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }
}