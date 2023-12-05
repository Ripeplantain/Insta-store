import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../state/features/productSlice';


const getToken = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('Token not found');
    }
    return token;
}

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api',
        prepareHeaders: (headers) => {
            const token = getToken();
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        listProducts: builder.query<Product[], void>({
            query: () => '/product',
        }),
        getProduct: builder.query<Product, string>({
            query: (id) => `/product/${id}`,
        }),
        createProduct: builder.mutation<Product, Partial<Product>>({
            query: (body) => ({
                url: '/product',
                method: 'POST',
                body,
            }),
        }),
        updateProduct: builder.mutation<Product, { id: string, body: Partial<Product> }>({
            query: ({ id, body }) => ({
                url: `/product/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteProduct: builder.mutation<Product, string>({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
            useListProductsQuery, useGetProductQuery, 
            useCreateProductMutation, useUpdateProductMutation, 
            useDeleteProductMutation } 
        = productApi;