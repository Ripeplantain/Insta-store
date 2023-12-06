import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../helper/constant';


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            }),
        }),
        registerUser: builder.mutation({
            query: (credentials) => ({
                url: '/register',
                method: 'POST',
                body: credentials
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST'
            }),
        })
    }),
})

export const { useLoginMutation, useRegisterUserMutation, useLogoutMutation } = authApi;