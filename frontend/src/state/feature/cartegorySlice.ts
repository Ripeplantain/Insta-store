import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { CartegoryState } from "../../helper/types/stateTypes";


const initialState: CartegoryState[] = localStorage.getItem('cartegory') ? JSON.parse(localStorage.getItem('cartegory')!) : [];

export const cartegorySlice = createSlice({
    name: 'cartegory',
    initialState,
    reducers: {
        setCartegory: (state, action: PayloadAction<CartegoryState[]>) => {
            state = action.payload;
            localStorage.setItem('cartegory', JSON.stringify(state));
        },
        addCartegory: (state, action: PayloadAction<CartegoryState>) => {
            state.push(action.payload);
        },
        updateCartegory: (state, action: PayloadAction<CartegoryState>) => {
            const index = state.findIndex((cartegory) => cartegory._id === action.payload._id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteCartegory: (state, action: PayloadAction<string>) => {
            return state.filter((cartegory) => cartegory._id !== action.payload);
        }
    }
})

export const { setCartegory, addCartegory, updateCartegory, deleteCartegory } = cartegorySlice.actions;

export const selectCartegory = (state: RootState) => state.cartegory;

export default cartegorySlice.reducer;