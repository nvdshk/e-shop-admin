import { LoginPayload } from '../../interface/userInteface'
import api from '../../util/api'

export const authApi = {
  login: async (payload: LoginPayload) => {
    const response = await api.post('/login', payload)
    return response.data
  },
}

export default authApi
