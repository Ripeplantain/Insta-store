import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../helper/constant";
import { ProductState } from "../helper/types/stateTypes";


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
        fetchProductById: builder.query<ProductState[], string | null>({
            query: (id) => ({
                url: `/product/cartegory/${id}`,
                method: 'GET',
            }),
        }),
    })
})

export const {
    useFetchProductsQuery, useFetchProductByIdQuery
} = productApi;