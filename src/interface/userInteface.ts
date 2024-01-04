export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface Token {
  access_token: string
  refresh_token: string
}

export interface ForgetPasswordPayload {
  userName: string
}

export interface currentUserResponse {
  user: User
}

export interface User {
  id: string
  image: string
  firstName: string
  lastName: string
  phoneNo: string
}
