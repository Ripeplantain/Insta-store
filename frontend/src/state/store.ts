import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/auth';
import { cartegoryApi } from '../api/cartegory';
import { productApi } from '../api/product';
import authSlice from './feature/authSlice';
import cartegorySlice from './feature/cartegorySlice';
import productSlice from './feature/productSlice';


export const store = configureStore({
    reducer: {
        auth: authSlice,
        cartegory: cartegorySlice,
        product: productSlice,
        [authApi.reducerPath]: authApi.reducer,
        [cartegoryApi.reducerPath]: cartegoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([
                authApi.middleware, cartegoryApi.middleware, productApi.middleware
            ])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch