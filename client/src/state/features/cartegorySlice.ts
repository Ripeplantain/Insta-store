import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import axios from 'axios'


export interface CartegoryState {
    _id: string
    name: string
    description: string
    createdAt: string
    updatedAt: string
}

const initialState = {
    data: [] as CartegoryState[],
    loading: false,
    error: null as string | null,
};


export const cartegorySlice = createSlice({
    name: 'cartegory',
    initialState,
    reducers: {
        setCartegories: (state, action: PayloadAction<CartegoryState[]>) => {
            state.data = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncCartegories.pending, (state) => {
            state.loading = true
        })
            .addCase(fetchAsyncCartegories.fulfilled, (state, action: PayloadAction<CartegoryState[]>) => {
            state.data = action.payload
            state.loading = false
        })
            .addCase(fetchAsyncCartegories.rejected, (state, action) => {
            state.error = action.error.message as string
            state.loading = false
        })
    }
})

export const fetchAsyncCartegories = createAsyncThunk(
    "cartegory/fetchAsync",
    async () => {
        const response = await axios.get("http://localhost:3000/api/cartegory")
        return response.data
    }
);

export const { setCartegories } = cartegorySlice.actions

export const selectCartegories = (state: RootState) => state.cartegory
export const selectisLoading = (state: RootState) => state.cartegory.loading
export const selectError = (state: RootState) => state.cartegory.error
export const selectData = (state: RootState) => state.cartegory.data

export default cartegorySlice.reducer

