import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../helper/constant";



export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: () => ({
                url: '/product/all',
                method: 'GET',
            }),
        }),
    })
})

export const {
    useFetchProductsQuery
} = productApi;