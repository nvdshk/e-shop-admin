import { Response } from '../../interface/responseInterface'
import {
  LoginPayload,
  LogoutPayload,
  Token,
} from '../../interface/userInteface'
import { apiSlice } from '../api/apiSlice'
import { login, logout } from './authSlice'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Token, LoginPayload>({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(login(result.data!))
        } catch (error: any) {
          console.log(error)
        }
      },
    }),

    logout: builder.mutation<Response<null>, LogoutPayload>({
      query: (data) => ({
        url: 'logout',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(logout())
        } catch (error: any) {
          console.log(error)
        }
      },
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation } = authApi
