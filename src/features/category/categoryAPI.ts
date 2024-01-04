import { Category, CategoryPayload } from '../../interface/categoryInterface'
import api from '../../util/api'
import { config } from '../../util/axiosConfig'

export const categoryApi = {
  create: async (payload: CategoryPayload) => {
    const formData = new FormData()
    formData.append('name', payload.name)
    formData.append('image', payload.image)
    const resonse = await api.post('/categories', formData)
    return resonse.data
  },

  get: async () => {
    const resonse = await api.get('/categories')
    return resonse.data
  },

  update: async (payload: CategoryPayload) => {
    const id = payload.id
    const formData = new FormData()
    formData.append('name', payload.name)
    formData.append('image', payload.image)
    const response = await api.put(`/categories/${id}`, formData)
    return response.data
  },

  delete: async (id: string) => {
    const resonse = await api.delete(`/categories/${id}`)
    return resonse.data
  },
}
