import { ProductsService } from "./service";

export const ProductsRouter = {
    match(url: string) {
        return url === '/products';
    },
    handle() {
        ProductsService.getAllProducts();
    },
}