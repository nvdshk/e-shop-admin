import { Product } from '../../interface/productInterface'
import api from '../../util/api'

export const productApi = {
  create: async (payload: Product) => {
    const formData = new FormData()

    formData.append('name', payload.name)
    formData.append('image', payload.image)
    formData.append('color', payload.color)
    formData.append('price', payload.price)
    formData.append('description', payload.description)
    formData.append('stock', payload.stock)
    payload.size.forEach((value: string) => {
      formData.append('size[]', value)
    })
    payload.images.forEach((value: string) => {
      formData.append('images[]', value)
    })
    payload.features.forEach((value: string) => {
      formData.append('features[]', value)
    })

    payload.categories.forEach((value: string) => {
      formData.append('categories[]', value)
    })

    const response = await api.post('products', formData)
    return response.data
  },
}
