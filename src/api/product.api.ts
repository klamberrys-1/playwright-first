import { APIRequestContext, APIResponse } from '@playwright/test';

export class ProductApi {
    private request: APIRequestContext;
    private baseUrl: string = 'https://jsonplaceholder.typicode.com'; // API de simulación

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    /**
     * Inyecta un nuevo producto/recurso directamente al Backend en milisegundos
     */
    async createProductSeeding(payload: object): Promise<{ id: number; [key: string]: any }> {
        const response: APIResponse = await this.request.post(`${this.baseUrl}/posts`, {
            data: payload,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        if (!response.ok()) {
            throw new Error(`Error en el API Data Seeding: ${response.statusText()}`);
        }

        return await response.json();
    }

    /**
     * Limpia la base de datos eliminando el recurso creado al finalizar el test (Teardown)
     */
    async deleteProductTeardown(id: number): Promise<void> {
        const response: APIResponse = await this.request.delete(`${this.baseUrl}/posts/${id}`);
        
        if (!response.ok()) {
            throw new Error(`Error en el API Teardown para el ID ${id}: ${response.statusText()}`);
        }
    }
}