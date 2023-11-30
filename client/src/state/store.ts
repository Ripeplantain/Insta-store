import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import productSlice from "./features/productSlice";
import cartegorySlice from "./features/cartegorySlice";
import cartSlice from "./features/cartSlice";
import orderSlice from "./features/orderSlice";
import vendorSlice from "./features/vendorSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
        cartegory: cartegorySlice,
        cart: cartSlice,
        orders: orderSlice,
        vendor: vendorSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch