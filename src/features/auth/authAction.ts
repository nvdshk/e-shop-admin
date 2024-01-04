import { Error } from '../../interface/errorInterface'
import { LoginPayload, Token, User } from '../../interface/userInteface'
import { ForgetPasswordState } from './authSlice'

export const authSliceAction = {
  login: 'auth/login',
  loginAction: (payload: LoginPayload) => ({
    type: authSliceAction.login,
    payload,
  }),

  updateForgetPassword: 'auth/updateForgetPassword',
  updateForgetPasswordAction: (payload: ForgetPasswordState) => ({
    type: authSliceAction.updateForgetPassword,
    payload,
  }),

  logout: 'auth/logout',
  logoutAction: () => ({
    type: authSliceAction.logout,
  }),

  setToken: 'auth/setToken',
  setTokenAction: (payload: Token) => ({
    type: authSliceAction.setToken,
    payload,
  }),
  setUser: 'auth/setUser',
  setUserAction: (payload: User) => ({
    type: authSliceAction.setUser,
    payload,
  }),
  loginFailed: 'auth/loginFailed',
  loginFailedAction: (payload: Error) => ({
    type: authSliceAction.loginFailed,
    payload,
  }),
}
