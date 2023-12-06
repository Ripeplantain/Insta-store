import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/auth';
import { cartegoryApi } from '../api/cartegory';
import authSlice from './feature/authSlice';
import cartegorySlice from './feature/cartegorySlice';


export const store = configureStore({
    reducer: {
        auth: authSlice,
        cartegory: cartegorySlice,
        [authApi.reducerPath]: authApi.reducer,
        [cartegoryApi.reducerPath]: cartegoryApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([authApi.middleware, cartegoryApi.middleware])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch