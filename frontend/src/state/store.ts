import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import { authApi } from '../api/auth';
import { cartegoryApi } from '../api/cartegory';
import { productApi } from '../api/product';
import { orderApi } from '../api/order';
import authSlice from './feature/authSlice';
import cartegorySlice from './feature/cartegorySlice';
import productSlice from './feature/productSlice';
import cartSlice from './feature/cartSlice';


const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const rootReducer = combineReducers({
    auth: authSlice,
    cartegory: cartegorySlice,
    product: productSlice,
    cart: cartSlice,
    [authApi.reducerPath]: authApi.reducer,
    [cartegoryApi.reducerPath]: cartegoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([
                authApi.middleware, cartegoryApi.middleware, productApi.middleware,
                orderApi.middleware
            ])
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch