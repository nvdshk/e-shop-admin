import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  ForgetPasswordPayload,
  LoginPayload,
  Token,
  User,
} from '../../interface/userInteface'

const token = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token')!)
  : null

export interface LoginState {
  loading: boolean
}

export interface ForgetPasswordState {
  loading: boolean
  token: string | null
}

export interface InitialState {
  currentUser: User | null
  token: Token | null
  login: LoginState
  forgetPassword: ForgetPasswordState
  error: Error | null
}

const initialState: InitialState = {
  currentUser: null,
  token: token, //TODO: Get user from local storage
  login: {
    loading: false,
  },
  forgetPassword: {
    loading: false,
    token: null,
  },
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.login.loading = true
      console.log('loggin in', state.currentUser, action.payload)
    },

    loginFailed: (state, action: PayloadAction<Error>) => {
      state.login.loading = false
      state.error = action.payload
    },

    forgetPassword: (state, action: PayloadAction<ForgetPasswordPayload>) => {
      state.forgetPassword.loading = true
      console.log('forget password initiate', action.payload)
    },

    updateForgetPassword: (
      state,
      action: PayloadAction<ForgetPasswordState>
    ) => {
      state.forgetPassword = action.payload
      console.log('updateForgetPassword initiate', state, action.payload)
    },

    setToken: (state, action: PayloadAction<Token>) => {
      state.token = action.payload
      state.login.loading = action.payload ? false : true

      if (action.payload) {
        localStorage.setItem('token', JSON.stringify(action.payload))
      } else {
        localStorage.removeItem('token')
      }
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.login.loading = action.payload ? false : true

      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload))
      } else {
        localStorage.removeItem('user')
      }
    },

    logout: (state) => {
      state.currentUser = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})

export const { login, setUser, loginFailed } = authSlice.actions
export default authSlice.reducer
