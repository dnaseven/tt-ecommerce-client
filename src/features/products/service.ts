import { ProductsApi } from "../../api/products"
import { Category } from "../../entities/category";
import { Product } from "../../entities/product";
import { store } from "../../store";
import { CartService } from "../cart/service";
import { appendProduct, filterByCategory, filterByTitle, resetFilterByCategory, resetFilterByTitle, setLoading, setProducts } from "./store";

export const ProductsService = {
    async getAllProducts() {
        store.dispatch(setLoading(true));
        const products = await ProductsApi.getAll();
        store.dispatch(setProducts(products));
        store.dispatch(setLoading(false));
    },
    async getProductById(id: number) {
        store.dispatch(setLoading(true));
        const product = await ProductsApi.getById(id);
        store.dispatch(appendProduct(product));
        store.dispatch(setLoading(false));
    },
    filterByTitle(title: string) {
        store.dispatch(filterByTitle(title));
    },
    resetFilterByTitle() {
        store.dispatch(resetFilterByTitle());
    },
    resetFilter() {
        store.dispatch(resetFilterByTitle());
        store.dispatch(resetFilterByCategory());
    },
    addProductToCart(product: Product) {
        CartService.addProductToCart(product);
    },
    removeProductFromCart(productId: Product['id']) {
        CartService.removeProductFromCart(productId);
    },
    increaseQuantity(productId: Product['id']) {
        CartService.increaseQuantity(productId);
    },
    decreaseQuantity(productId: Product['id']) {
        CartService.decreaseQuantity(productId);
    },
    filterByCategories(categories: Record<Category['name'], boolean>) {
        store.dispatch(filterByCategory(categories));
    },
    resetFilterByCategory() {
        store.dispatch(resetFilterByCategory())
    }
}