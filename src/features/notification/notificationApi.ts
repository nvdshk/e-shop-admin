import {
  NotifcationPayload,
  Notification,
} from '../../interface/notificationInterface'
import { Response } from '../../interface/responseInterface'
import { apiSlice } from '../api/apiSlice'

export const storeSettingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPushNotifications: builder.query<Response<[Notification]>, undefined>({
      query: () => ({
        url: '/notifications/all',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    sendPushNotification: builder.mutation<Response<null>, NotifcationPayload>({
      query: (data) => ({
        url: `/notifications/send-to-all`,
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
    }),
  }),
})

export const { useGetPushNotificationsQuery, useSendPushNotificationMutation } =
  storeSettingsApi
