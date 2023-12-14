import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { tokenReceived, logout } from '../state/feature/authSlice'
import { baseUrl } from '../helper/constant'


interface RefreshResponse {
    accessToken: string
    
}

const baseQuery = fetchBaseQuery({ baseUrl: baseUrl })
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 403) {
    // try to get a new token
    const refreshResult = await baseQuery({
      url: '/refresh',
      method: 'POST',
      body: { refreshToken: localStorage.getItem('refreshToken') }
    }, api, extraOptions)
    if (refreshResult.data) {
        const data = refreshResult.data as RefreshResponse
      // store the new token
      api.dispatch(tokenReceived(data.accessToken))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }
  return result
}