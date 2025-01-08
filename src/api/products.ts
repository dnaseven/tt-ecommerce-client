import { BaseApiError } from "../errors/base";
import { fetcher } from "./fetcher"

export const ProductsApi = {
    async getAll() {
        try {
            const response = await fetcher('products');
            const data = await response.data;
            return data;
        } catch (e) {
            throw new BaseApiError('Error while fetching /products');
        }
    },
    async getById(id: number) {
        try {
            const response = await fetcher(`products/${id}`);
            const data = await response.data;
            return data;
        } catch (e) {
            throw new BaseApiError(`Error while fetching /products/${id}`);
        }
    }
}