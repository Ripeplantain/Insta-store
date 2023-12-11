import { createApi } from "@reduxjs/toolkit/query/react";
import { OrderState } from "../helper/types/stateTypes";
import { OrderInput } from "../helper/types/inputTypes";
import { baseQueryWithReauth } from "./customQuery";



export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        fetchOrders: builder.query<OrderState[], undefined>({
            query: () => ({
                url: '/order/all',
                method: 'GET',
            }),
        }),
        fetchOrderById: builder.query<OrderState[], string | null>({
            query: (id) => ({
                url: `/order/${id}`,
                method: 'GET',
            }),
        }),
        fetchOrderByClient: builder.query<OrderState[], string | null>({
            query: (id) => ({
                url: `/order/client/${id}`,
                method: 'GET',
            }),
        }),
        fetchOrderByProduct: builder.query<OrderState[], string | null>({
            query: (id) => ({
                url: `/order/product/${id}`,
                method: 'GET',
            }),
        }),
        createOrder: builder.mutation<OrderInput[], OrderInput[]>({
            query(body) {
                return {
                    url: '/order',
                    method: 'POST',
                    body: body,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            }
        }),
        updateOrder: builder.mutation<OrderState, OrderState>({
            query(body) {
                return {
                    url: `/order${body._id}`,
                    method: 'PUT',
                    body: body
                }
            }
        }),
        deleteOrder: builder.mutation<OrderState, string | null>({
            query(id) {
                return {
                    url: `/order/delete/${id}`,
                    method: 'DELETE',
                }
            }
        })
    })
})

export const {
    useFetchOrdersQuery, useFetchOrderByIdQuery, useFetchOrderByClientQuery,
    useFetchOrderByProductQuery, useCreateOrderMutation, useUpdateOrderMutation,
    useDeleteOrderMutation
} = orderApi;
