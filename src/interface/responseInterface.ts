export interface Response<T> {
  success: boolean
  message?: string
  data?: T
}

export interface Request<T> {
  _id: string
  data: T
}
