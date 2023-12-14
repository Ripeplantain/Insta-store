import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../helper/constant";
import { ProductState } from "../helper/types/stateTypes";
import { ProductInput } from "../helper/types/inputTypes";


export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        fetchProducts: builder.query<ProductState[], undefined>({
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
        searchProduct: builder.query<ProductState[], string | null>({
            query: (search) => ({
                url: `/product/all/?name=${search}`,
                method: 'GET',
            })
        }),
        createProduct: builder.mutation<ProductState, ProductInput>({
            query: (body) => ({
                url: '/product',
                method: 'POST',
                body: body,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        }),
    })
})

export const {
    useFetchProductsQuery, useFetchProductByIdQuery, useSearchProductQuery, useCreateProductMutation
} = productApi;