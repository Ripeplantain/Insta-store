import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ProductState, ProductSliceState } from "../../helper/types/stateTypes";


const initialState: ProductSliceState = {
    product: [],
    searchedProduct: null,
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<ProductState[]>) => {
            state.product = action.payload;
            // localStorage.setItem('product', JSON.stringify(state));
        },
        addProduct: (state, action: PayloadAction<ProductState>) => {
            state.product.push(action.payload);
        },
        setSearchProduct: (state, action: PayloadAction<string | null>) => {
            state.searchedProduct = action.payload;
        }
    }
})


export const { setProduct, addProduct, setSearchProduct } = productSlice.actions;

export const selectProduct = (state: RootState) => state.product.product;
export const selectSearchedProduct = (state: RootState) => state.product.searchedProduct;

export default productSlice.reducer;