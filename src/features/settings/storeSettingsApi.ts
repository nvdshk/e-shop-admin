import { Request, Response } from '../../interface/responseInterface'
import { Store } from '../../interface/settingInterface'
import { apiSlice } from '../api/apiSlice'

export const storeSettingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoreSettings: builder.query<Response<Store>, undefined>({
      query: () => ({
        url: '/store-settings',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),

    saveStoreSettings: builder.mutation<Response<Store>, Request<Store>>({
      query: (data) => ({
        url: `/store-settings/${data._id}`,
        method: 'PUT',
        body: data.data,
        credentials: 'include' as const,
      }),
    }),
  }),
})

export const { useGetStoreSettingsQuery, useSaveStoreSettingsMutation } =
  storeSettingsApi
