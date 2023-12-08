import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ProductState, CartState } from "../../helper/types/stateTypes";


const initialState: CartState = {
    items: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")!) : [],
    count: localStorage.getItem("cartCount") ? JSON.parse(localStorage.getItem("cartCount")!) : 0,
    total: localStorage.getItem("cartTotal") ? JSON.parse(localStorage.getItem("cartTotal")!) : 0,
};


export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ProductState>) => {
            const product = action.payload;
            const item = state.items.find((i) => i._id === product._id);
            if (item) {
                item.quantity++;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
            state.count++;
            const total = Number(state.total + product.price).toFixed(2);
            state.total = Number(total);
            localStorage.setItem("cartItems", JSON.stringify(state.items));
            localStorage.setItem("cartCount", JSON.stringify(state.count));
            localStorage.setItem("cartTotal", JSON.stringify(state.total));
        },
        removeItem: (state, action: PayloadAction<ProductState>) => {
            const product = action.payload;
            const item = state.items.find((i) => i._id === product._id);
            if (item && item.quantity > 1) {
                item.quantity--;
            } else if(state.items.length === 1){
                state.items = [];
                localStorage.removeItem("cart");
            } else {
                state.items = state.items.filter((i) => i._id !== product._id);
            }
            state.count--;
            const total = Number(state.total - product.price).toFixed(2);
            state.total = Number(total);

            localStorage.setItem("cartItems", JSON.stringify(state.items));
            localStorage.setItem("cartCount", JSON.stringify(state.count));
            localStorage.setItem("cartTotal", JSON.stringify(state.total));
        },
        clearCart: (state) => {
            state.items = [];
            state.count = 0;
            state.total = 0;
            localStorage.removeItem("cartItems");
            localStorage.removeItem("cartCount");
            localStorage.removeItem("cartTotal");
        },
        removeItemFromCart: (state, action: PayloadAction<ProductState>) => {
            const product = action.payload;
            const item = state.items.find((i) => i._id === product._id);
            if (item) {
                state.items = state.items.filter((i) => i._id !== product._id);
            }
            state.count--;
            const total = Number(state.total - product.price).toFixed(2);
            state.total = Number(total);

            localStorage.setItem("cartItems", JSON.stringify(state.items));
            localStorage.setItem("cartCount", JSON.stringify(state.count));
            localStorage.setItem("cartTotal", JSON.stringify(state.total));
        
        }
    }
})

export const { addItem, removeItem, clearCart, removeItemFromCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) => state.cart.count;
export const selectCartTotal = (state: RootState) => state.cart.total;

export default cartSlice.reducer;