import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from 'axios'


export interface Product {
    _id: string
    name: string
    description: string
    price: number
    number: number
    createdAt: string
    updatedAt: string
}

const initialState = {
    data: [] as Product[],
    loading: false,
    error: null as string | null,
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.data = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncProducts.pending, (state) => {
                state.loading = true
                console.log('pending...')
            })
            .addCase(fetchAsyncProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(fetchAsyncProducts.rejected, (state, action) => {
                state.error = action.error.message as string
                state.loading = false
                console.log(action.error.message)
            })
    
    }
})


export const fetchAsyncProducts = createAsyncThunk(
    "product/fetchAsync",
    async () => {
        const response = await axios.get("http://localhost:3000/api/product/all")
        return response.data
    }
)

export const { setProducts } = productSlice.actions

export const selectProducts = (state: RootState) => state.product
export const selectIsLoading = (state: RootState) => state.product.loading
export const selectError = (state: RootState) => state.product.error
export const selectData = (state: RootState) => state.product.data

export default productSlice.reducer