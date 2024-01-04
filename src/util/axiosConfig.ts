import { Token } from '../interface/userInteface'

const getTokenFromLocalStorage: Token = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token')!)
  : null

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null
        ? getTokenFromLocalStorage.access_token
        : ''
    }`,
    Accept: 'application/json',
  },
}
