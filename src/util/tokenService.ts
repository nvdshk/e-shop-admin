import { Token, User } from '../interface/userInteface'

class TokenService {
  getLocalRefreshToken(): string {
    const token = JSON.parse(localStorage.getItem('token')!) as Token
    return token?.refresh_token
  }

  getLocalAccessToken(): string {
    const token = JSON.parse(localStorage.getItem('token')!) as Token
    return token?.access_token
  }

  updateLocalToken(token: Token) {
    localStorage.setItem('token', JSON.stringify(token))
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user')!)
  }

  setUser(user: User) {
    console.log(JSON.stringify(user))
    localStorage.setItem('user', JSON.stringify(user))
  }

  removeUser() {
    localStorage.removeItem('user')
  }
}

export default new TokenService()
