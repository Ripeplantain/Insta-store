import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import productSlice from "./features/productSlice";
import cartegorySlice from "./features/cartegorySlice";
import cartSlice from "./features/cartSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
        cartegory: cartegorySlice,
        cart: cartSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch