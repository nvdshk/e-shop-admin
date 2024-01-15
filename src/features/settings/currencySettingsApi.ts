import { Request, Response } from '../../interface/responseInterface'
import { Currency, Store } from '../../interface/settingInterface'
import { apiSlice } from '../api/apiSlice'

export const storeSettingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCurrency: builder.query<Response<Array<Currency>>, undefined>({
      query: () => ({
        url: '/currency-settings',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),

    createCurrency: builder.mutation<Response<Currency>, Currency>({
      query: (data) => ({
        url: `/currency-settings`,
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
    }),
  }),
})

export const { useGetAllCurrencyQuery, useCreateCurrencyMutation } =
  storeSettingsApi
