import { Category, CategoryPayload } from '../../interface/categoryInterface'
import { Request, Response } from '../../interface/responseInterface'
import { apiSlice } from '../api/apiSlice'

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<Response<Category>, CategoryPayload>({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
    }),
    getCategory: builder.query<Response<Category>, string>({
      query: (id: string) => ({
        url: `categories/${id}`,
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    getAllCategory: builder.query<Response<[Category]>, undefined>({
      query: () => ({
        url: '/categories',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),

    updateCategory: builder.mutation<
      Response<Category>,
      Request<CategoryPayload>
    >({
      query: (data) => ({
        url: `/categories/${data._id}`,
        method: 'PUT',
        body: data.data,
        credentials: 'include' as const,
      }),
    }),
    deleteCategory: builder.mutation<Response<null>, string>({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'DELETE',
        credentials: 'include' as const,
      }),
    }),
  }),
})

export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useGetAllCategoryQuery,
  useLazyGetAllCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi
