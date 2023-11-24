import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; 
import type { RootState } from "../store";
import type { Product } from "./productSlice";


interface Cart {
    items: Product[];
    count: number;
    total: number;

}


const initialState: Cart = {
    items: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : [],
    count: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!).length : 0,
    total: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!).reduce((total: number, item: Product) => total + item.price, 0) : 0,
};



export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            const item = state.items.find((i) => i._id === product._id);
            if (item) {
                item.number++;
            } else {
                state.items.push({ ...product, number: 1 });
            }
            state.count++;
            const total = Number(state.total + product.price).toFixed(2);
            state.total = Number(total);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        removeFromCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            const item = state.items.find((i) => i._id === product._id);
            if (item && item.number > 1) {
                item.number--;
            } else {
                state.items = state.items.filter((i) => i._id !== product._id);
            }
            state.count--;
            const total = Number(state.total - product.price).toFixed(2);
            state.total = Number(total);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            state.count = 0;
            state.total = 0;
            localStorage.removeItem("cart");
        },
    },
});


export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
export const selectCartCount = (state: RootState) => state.cart.count;

export default cartSlice.reducer;