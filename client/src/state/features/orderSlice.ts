import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers/axios";


export interface Order {
    _id: string;
    client: string;
    product: string[];
    quantity: number;
    status: string;
    location: string;
    total: number;
    paymentState: string;
    createdAt: Date;
    updatedAt: Date;

}

export interface OrderState {
    loading: boolean;
    error: string | null;
    data: Order[];
}


const initialState: OrderState = {
    loading: false,
    error: null,
    data: []
};


export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.data = action.payload;
        },
        addOrder: (state, action: PayloadAction<Order>) => {
            state.data.push(action.payload);
        },
        updateOrder: (state, action: PayloadAction<Order>) => {
            const index = state.data.findIndex((order) => order._id === action.payload._id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        },
        deleteOrder: (state, action: PayloadAction<Order>) => {
            state.data = state.data.filter((order) => order._id !== action.payload._id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postAsyncOrder.pending, (state) => {
                state.loading = true;
                console.log("pending...");
            })
            .addCase(postAsyncOrder.fulfilled, (state, action: PayloadAction<Order>) => {
                state.data.push(action.payload);
                state.loading = false;
            })
            .addCase(postAsyncOrder.rejected, (state, action) => {
                state.error = action.error.message as string;
                state.loading = false;
            })
            .addCase(getAsyncOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAsyncOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(getAsyncOrders.rejected, (state, action) => {
                state.error = action.error.message as string;
                state.loading = false;
            })
    }
});

export const postAsyncOrder = createAsyncThunk(
    "orders/postAsyncOrder",
    async (order: OrderState) => {
        const response = await axiosInstance.post("/order", order);
        return response.data;
    }
)

export const getAsyncOrders = createAsyncThunk(
    "orders/getAsyncOrders",
    async () => {
        const response = await axiosInstance.get("/order/user");
        return response.data;
    }

)


export const { setOrders, addOrder, updateOrder, deleteOrder } = orderSlice.actions;

export const selectOrders = (state: RootState) => state.orders;
export const selectLoading = (state: RootState) => state.orders.loading;
export const selectError = (state: RootState) => state.orders.error;

export default orderSlice.reducer;