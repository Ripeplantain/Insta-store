import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../helper/constant';


export const cartegoryApi = createApi({
    reducerPath: 'cartegoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        fetchCarteogrories: builder.query({
            query: () => ({
                url: '/cartegory',
                method: 'GET',
            }),
        })
    }),
})

export const { 
    useFetchCarteogroriesQuery
} = cartegoryApi;