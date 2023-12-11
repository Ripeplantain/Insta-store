import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { CartegoryState, CartegorySliceState } from "../../helper/types/stateTypes";



const initialState: CartegorySliceState = {
    cartegory: [],
    selectedCartegory: null,

}

export const cartegorySlice = createSlice({
    name: 'cartegory',
    initialState,
    reducers: {
        setCartegory: (state, action: PayloadAction<CartegoryState[]>) => {
            state.cartegory = action.payload;
        },
        addCartegory: (state, action: PayloadAction<CartegoryState>) => {
            state.cartegory.push(action.payload);
        },
        setSelectedCartegory: (state, action: PayloadAction<string>) => {
            state.selectedCartegory = action.payload;
        
        }
    }
})

export const { setCartegory, addCartegory, setSelectedCartegory } = cartegorySlice.actions;

export const selectCartegory = (state: RootState) => state.cartegory.cartegory;
export const selectSelectedCartegory = (state: RootState) => state.cartegory.selectedCartegory;

export default cartegorySlice.reducer;