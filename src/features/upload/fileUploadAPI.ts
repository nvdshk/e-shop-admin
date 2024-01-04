import api from '../../util/api'

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}

export const fileUploadApi = {
  upload: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const response = await api.post('/files', formData, config)
    return response.data
  },
}
