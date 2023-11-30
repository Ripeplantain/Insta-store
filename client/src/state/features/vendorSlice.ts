import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { axiosInstance } from '../../helpers/axios'
import { ErrorState } from '../../helpers/types/error';


interface Vendor {
    name: string;
    deliveryType: string;
    user: string;
}

interface VendorState {
    vendors: Vendor;
    loading: boolean;
    error: string | null;
}

const initialState: VendorState = {
    vendors: localStorage.getItem('vendors') ? JSON.parse(localStorage.getItem('vendors') || '{}') : {} ,
    loading: false,
    error: null,
}


export const vendorSlice = createSlice({
    name: 'vendor',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAsyncVendor.pending, (state) => {
                state.loading = true
            })
            .addCase(createAsyncVendor.fulfilled, (state, action: PayloadAction<Vendor>) => {
                state.vendors = action.payload
                localStorage.setItem('vendors', JSON.stringify(action.payload))
                state.loading = false
                state.error = null
            })
            .addCase(createAsyncVendor.rejected, (state, action) => {
                state.error = action.payload as string
                state.loading = false
            })
            .addCase(fetchAsyncVendors.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAsyncVendors.fulfilled, (state, action: PayloadAction<Vendor>) => {
                state.vendors = action.payload
                localStorage.setItem('vendors', JSON.stringify(action.payload))
                state.loading = false
                state.error = null
            })
            .addCase(fetchAsyncVendors.rejected, (state, action) => {
                state.error = action.payload as string
                state.loading = false
            })
    }
})

export const createAsyncVendor = createAsyncThunk(
    'vendor/create',
    async (vendor: Vendor, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/vendor', vendor)
            return response.data
        } catch (err) {
            const error = err as ErrorState
            return rejectWithValue(error.response.data)
        }
    }
)

export const fetchAsyncVendors = createAsyncThunk(
    'vendor/fetch',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/vendor/${id}`)
            return response.data
        } catch (err) {
            const error = err as ErrorState
            return rejectWithValue(error.response.data)
        }
    }

)

export const selectVendor = (state: RootState) => state.vendor.vendors
export default vendorSlice.reducer