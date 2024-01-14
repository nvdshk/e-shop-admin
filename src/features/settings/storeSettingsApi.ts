import { Request, Response } from '../../interface/responseInterface'
import { Setting } from '../../interface/settingInterface'
import { apiSlice } from '../api/apiSlice'

export const storeSettingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoreSettings: builder.query<Response<Setting>, undefined>({
      query: () => ({
        url: '/settings',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),

    updateStoreSettings: builder.mutation<Response<Setting>, Request<Setting>>({
      query: (data) => ({
        url: `/settings/${data._id}`,
        method: 'PUT',
        body: data.data,
        credentials: 'include' as const,
      }),
    }),
  }),
})

export const { useGetStoreSettingsQuery, useUpdateStoreSettingsMutation } =
  storeSettingsApi
