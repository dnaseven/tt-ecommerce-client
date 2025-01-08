import { Product } from "../../entities/product";
import { store } from "../../store";
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, removeAllFromCart } from "./store";

export const CartService = {
    addProductToCart(product: Product) {
        store.dispatch(addToCart(product));
    },
    removeProductFromCart(productId: Product['id']) {
        store.dispatch(removeFromCart(productId));
    },
    increaseQuantity(productId: Product['id']) {
        store.dispatch(increaseQuantity(productId));
    },
    decreaseQuantity(productId: Product['id']) {
        store.dispatch(decreaseQuantity(productId));
    },
    removeAllFromCart() {
        store.dispatch(removeAllFromCart());
    }
}