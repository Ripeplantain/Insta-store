import { createApi } from '@reduxjs/toolkit/query/react';
import { VendorState } from '../helper/types/stateTypes';
import { VendorInput } from '../helper/types/inputTypes';
import { baseQueryWithReauth } from './customQuery';



export const vendorApi = createApi({
    reducerPath: 'vendorApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        fetchVendors: builder.query<VendorState[], undefined>({
            query: () => ({
                url: '/vendor/all',
                method: 'GET',
            }),
        }),
        fetchVendorById: builder.query<VendorState[], string | null>({
            query: (id) => ({
                url: `/vendor/${id}`,
                method: 'GET',
            }),
        }),
        createVendor: builder.mutation<VendorState, VendorInput>({
            query(body) {
                return {
                    url: '/vendor',
                    method: 'POST',
                    body: body,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            }
        }),
        updateVendor: builder.mutation<VendorState, VendorState>({
            query(body) {
                return {
                    url: `/vendor${body._id}`,
                    method: 'PUT',
                    body: body
                }
            }
        }),
        deleteVendor: builder.mutation<VendorState, string | null>({
            query(id) {
                return {
                    url: `/vendor/delete/${id}`,
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            }
        })
    })
})


export const {
    useFetchVendorsQuery,
    useFetchVendorByIdQuery,
    useCreateVendorMutation,
    useUpdateVendorMutation,
    useDeleteVendorMutation
} = vendorApi;