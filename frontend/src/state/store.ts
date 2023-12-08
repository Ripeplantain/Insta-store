import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/auth';
import { cartegoryApi } from '../api/cartegory';
import { productApi } from '../api/product';
import { orderApi } from '../api/order';
import authSlice from './feature/authSlice';
import cartegorySlice from './feature/cartegorySlice';
import productSlice from './feature/productSlice';
import cartSlice from './feature/cartSlice';


export const store = configureStore({
    reducer: {
        auth: authSlice,
        cartegory: cartegorySlice,
        product: productSlice,
        cart: cartSlice,
        [authApi.reducerPath]: authApi.reducer,
        [cartegoryApi.reducerPath]: cartegoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([
                authApi.middleware, cartegoryApi.middleware, productApi.middleware,
                orderApi.middleware
            ])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch