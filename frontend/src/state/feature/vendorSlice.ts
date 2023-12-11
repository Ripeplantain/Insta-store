import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { VendorState } from "../../helper/types/stateTypes";



const initialState: VendorState = {
    _id: '',
    name: '',
    description: '',
    user: '',
    diliveryType: '',
    createdAt: '',
    updatedAt: ''
}

export const vendorSlice = createSlice({
    name: 'vendor',
    initialState,
    reducers: {
        setVendor: (state, action: PayloadAction<VendorState>) => {
            state = action.payload;
        }
    }
})


export const { setVendor } = vendorSlice.actions;

export const selectVendor = (state: RootState) => state;

export default vendorSlice.reducer;