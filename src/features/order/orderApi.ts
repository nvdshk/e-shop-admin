import {
  Order,
  OrderStatus,
  OrderStatusPayload,
} from '../../interface/orderInterface'
import { Product } from '../../interface/productInterface'
import { Request, Response } from '../../interface/responseInterface'
import { apiSlice } from '../api/apiSlice'

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Response<[Order]>, undefined>({
      query: () => ({
        url: '/orders',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),

    getOrder: builder.query<Response<Order>, string>({
      query: (id: string) => ({
        url: `orders/${id}`,
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),

    updateOrderStatus: builder.mutation<Response<Product>, OrderStatusPayload>({
      query: (data) => ({
        url: `/orders/${data._id}/status/${data.statusId}`,
        method: 'PUT',
        body: {},
        credentials: 'include' as const,
      }),
    }),
  }),
})

export const {
  useGetOrderQuery,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi
