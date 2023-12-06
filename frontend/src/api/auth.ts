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
        logoutUser: builder.mutation({
            query: (refreshToken) => ({
                url: '/logout',
                method: 'POST',
                body: { refreshToken }
            }),
        })
    }),
})

export const { useLoginMutation, useRegisterUserMutation, useLogoutUserMutation } = authApi;