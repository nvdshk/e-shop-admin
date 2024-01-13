import { Response } from '../../interface/responseInterface'
import { apiSlice } from '../api/apiSlice'

// const config = {
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// }

export const fileUploadApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fileUpload: builder.mutation<{ success: boolean; url: string }, File>({
      query: (file) => {
        const formData = new FormData()
        formData.append('file', file)
        console.log(`file data: ${formData}`)

        return {
          url: '/files',
          method: 'POST',
          body: formData,
          formData: true,
          credentials: 'include' as const,
        }
      },
    }),
  }),
})

export const { useFileUploadMutation } = fileUploadApi
