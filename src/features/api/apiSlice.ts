import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import TokenService from '../../util/tokenService'
import { Response } from '../../interface/responseInterface'
import { Token } from '../../interface/userInteface'
import { base_url, dev_base_url } from '../../util/baseUrl'
import { logout } from '../auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: base_url,
  prepareHeaders: (headers) => {
    // this method should retrieve the token without a hook
    const token = TokenService.getLocalAccessToken()

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      {
        url: '/refresh',
        method: 'POST',
        body: {
          refresh_token: TokenService.getLocalRefreshToken(),
        },
      },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      // store the new token in the store or wherever you keep it
      // api.dispatch(tokenReceived(refreshResult.data));

      // store the new token in the store or wherever you keep it
      const updatedToken = refreshResult.data as Token
      TokenService.updateLocalToken(updatedToken!)

      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      // refresh failed - do something like redirect to login or show a "retry" button
      api.dispatch(logout())
    }
  }
  return result
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
})

export const {} = apiSlice
