import { Category, CategoryPayload } from '../../interface/categoryInterface'
import { Product } from '../../interface/productInterface'
import { Request, Response } from '../../interface/responseInterface'
import { apiSlice } from '../api/apiSlice'

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<Response<Product>, Product>({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
    }),
    getProduct: builder.query<Response<Product>, string>({
      query: (id: string) => ({
        url: `products/${id}`,
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    getProducts: builder.query<Response<[Product]>, undefined>({
      query: () => ({
        url: '/products',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),

    updateProduct: builder.mutation<Response<Product>, Request<Product>>({
      query: (data) => ({
        url: `/products/${data._id}`,
        method: 'PUT',
        body: data.data,
        credentials: 'include' as const,
      }),
    }),
    deleteProduct: builder.mutation<Response<null>, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
        credentials: 'include' as const,
      }),
    }),
  }),
})

export const {
  useCreateProductMutation,
  useGetProductQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi
