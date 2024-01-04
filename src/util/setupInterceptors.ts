import { RootState } from '../app/store'
import { Token } from '../interface/userInteface'
import TokenService from '../util/tokenService'

import axiosInstance from './api'

const setup = (store: any) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken()

      if (token) {
        // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        config.headers['Authorization'] = 'Bearer ' + token // for Node.js Express back-end
      }

      if (config.url === '/files') {
        config.headers['Content-Type'] = 'multipart/form-data'
      } else {
        // config.headers['Content-Type'] = 'application/json'
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  const { dispatch } = store

  axiosInstance.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {
      const originalConfig = err.config

      if (originalConfig.url !== '/login' && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true

          try {
            console.log(
              `access the token: ${TokenService.getLocalAccessToken()}`
            )
            console.log(
              `refresh the token: ${TokenService.getLocalRefreshToken()}`
            )
            const rs = await axiosInstance.post('/refresh', {
              refresh_token: TokenService.getLocalRefreshToken(),
            })

            const updatedToken = rs.data as Token

            // dispatch(
            //   refreshToken({
            //     refresh_token: localToken.refreshToken,
            //   })
            // )

            TokenService.updateLocalToken(updatedToken)

            return axiosInstance(originalConfig)
          } catch (_error) {
            return Promise.reject(_error)
          }
        }
      }

      return Promise.reject(err)
    }
  )
}

export default setup
