import { test, expect } from '@playwright/test';
import { InventoryPage } from '../src/pages/inventory.page';
import { CartPage } from '../src/pages/cart.page';

test.describe('E2E Optimization - API Seeding & Hybrid Flow', () => {
    
    test.beforeEach(async ({ page, context }) => {
    // 1. Inyectamos la cookie directamente al contexto del navegador (Nivel Red)
    // Esto simula que nuestro Seeding de API devolvió el token y lo persistimos.
    await context.addCookies([{
        name: 'session-username',
        value: 'standard_user',
        domain: '.saucedemo.com',
        path: '/'
    }]);

    // 2. Ahora navegamos directo a la tienda. 
    // Como la cookie ya viaja en la cabecera HTTP, el servidor nos acepta de inmediato.
    await page.goto('https://www.saucedemo.com/inventory.html');
});

    test('Debería completar una orden de compra inyectando el estado inicial', async ({ page }) => {
        // Inicializamos nuestros Page Objects pasando la instancia de la página actual
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        // 1. Verificamos que entramos directo saltándonos el Login por UI
        expect(await inventoryPage.isPageLoaded()).toBe(true);

        // 2. Interactuamos con los componentes lógicos encapsulados
        await inventoryPage.addFirstProductToCart();
        expect(await inventoryPage.getCartItemsCount()).toBe('1');
        
        await inventoryPage.goToCart();

        // 3. Completamos el flujo de negocio del Checkout
        await cartPage.completeCheckoutFlow('Fabian', 'Gonzalez', '4780000');

        // 4. Aserción final de calidad: Validamos que la orden fue exitosa
        const successMessage = await cartPage.getConfirmationMessage();
        expect(successMessage).toContain('Thank you for your order!');
    });

    test.afterAll(async () => {
        // [TEARDOWN]
        // Aquí es donde tu framework ejecutaría el método 'deleteProductTeardown()' de la API
        // para dejar la base de datos limpia de "datos sucios" creados por el test.
        console.log('Se ejecuta Teardown: Base de datos limpia de registros de prueba.');
    });
});