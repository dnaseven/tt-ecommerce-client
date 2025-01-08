import { createSelector, createSlice } from '@reduxjs/toolkit'
import { Product } from '../../entities/product';
import { RootState } from '../../store';
import { stat } from 'fs';

interface CartState {
    allIds: Product['id'][];
    byIds: Record<Product['id'], Product & { quantity: number }>;
}

const initialState: CartState = {
    allIds: [],
    byIds: {},
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const product = action.payload;
        if (state.allIds.includes(product.id)) {
            state.byIds[product.id].quantity++;
        } else {
            state.allIds.push(product.id);
            state.byIds[product.id] = { ...product, quantity: 1 };
        }
    },
    removeFromCart: (state, action) => {
        const productId = action.payload;
        state.allIds = state.allIds.filter(id => id !== productId);
        delete state.byIds[productId];
    },
    increaseQuantity: (state, action) => {
        const productId = action.payload;
        state.byIds[productId].quantity++;
    },
    decreaseQuantity: (state, action) => {
        const productId = action.payload;
        if (state.byIds[productId].quantity > 1) {
            state.byIds[productId].quantity--;
        }
    },
    removeAllFromCart: (state) => {
        state.allIds = [];
        state.byIds = {};
    },
  }
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, removeAllFromCart } = cartSlice.actions

export const selectCart = (state: RootState) => state.cart.allIds.map(id => state.cart.byIds[id]);

export const selectTotalPrice = createSelector(
    [(state: RootState) => state.cart],
    (cart) => {
        return cart.allIds.reduce((acc, id) => {
            const product = cart.byIds[id];
            return acc + product.price * product.quantity;
        }, 0);
    }
);

export default cartSlice.reducer