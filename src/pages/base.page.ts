import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Métodos utilitarios compartidos por cualquier página
    async navigateTo(path: string): Promise<void> {
        await this.page.goto(path);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    // Espera inteligente centralizada para depuración
    async waitForElement(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible' });
    }
}