import { Params } from '../../interface/paramsInteface'
import {
  SubCategory,
  SubCategoryPayload,
} from '../../interface/subCategoryInterface'
import api from '../../util/api'

export const subCategoryApi = {
  create: async (payload: SubCategoryPayload) => {
    const formData = new FormData()

    formData.append('name', payload.name)
    formData.append('image', payload.image)
    formData.append('parentId', payload.parentId)

    const response = await api.post('categories', formData)
    return response.data
  },

  get: async (payload: Params) => {
    const params = payload
    const response = await api.get('categories', params)
    return response.data
  },
}
