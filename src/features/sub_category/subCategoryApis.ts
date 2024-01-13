import { Category, MainCategory } from '../../interface/categoryInterface'
import { Params } from '../../interface/paramsInteface'
import { Request, Response } from '../../interface/responseInterface'
import { SubCategory } from '../../interface/subCategoryInterface'
import { apiSlice } from '../api/apiSlice'

export const subCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSubCategory: builder.mutation<Response<Category>, Category>({
      query: (data) => ({
        url: '/categories',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
    }),
    getSubCategory: builder.query<Response<Category>, string>({
      query: (id: string) => ({
        url: `categories/${id}`,
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    getAllSubCategory: builder.query<Response<[MainCategory]>, undefined>({
      query: (args) => ({
        url: '/categories',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    getSubCategoryWithCatId: builder.query<Response<[SubCategory]>, Params>({
      query: (args) => ({
        url: '/categories',
        params: { parentId: args.params.parentId },
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),

    updateSubCategory: builder.mutation<Response<Category>, Request<Category>>({
      query: (data) => ({
        url: `/categories/${data._id}`,
        method: 'PUT',
        body: data.data,
        credentials: 'include' as const,
      }),
    }),
    deleteSubCategory: builder.mutation<Response<null>, string>({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'DELETE',
        credentials: 'include' as const,
      }),
    }),
  }),
})

export const {
  useCreateSubCategoryMutation,
  useGetSubCategoryQuery,
  useGetAllSubCategoryQuery,
  useLazyGetSubCategoryWithCatIdQuery,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoriesApi
