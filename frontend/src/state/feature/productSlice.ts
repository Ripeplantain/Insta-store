import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ProductState } from "../../helper/types/stateTypes";


const initialState: ProductState[] = localStorage.getItem('product') ? JSON.parse(localStorage.getItem('product')!) : [];

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<ProductState[]>) => {
            state = action.payload;
            localStorage.setItem('product', JSON.stringify(state));
        },
        addProduct: (state, action: PayloadAction<ProductState>) => {
            state.push(action.payload);
        },
        updateProduct: (state, action: PayloadAction<ProductState>) => {
            const index = state.findIndex((product) => product._id === action.payload._id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            return state.filter((product) => product._id !== action.payload);
        }
    }
})


export const { setProduct, addProduct, updateProduct, deleteProduct } = productSlice.actions;

export const selectProduct = (state: RootState) => state.product;

export default productSlice.reducer;