export interface Notification {
  message: {
    notification: {
      title: string
      body: string
      image?: string
    }
    token?: string
    tokens?: [string]
  }
  sent: boolean
  date: Date
}

export interface NotifcationPayload {
  title: string
  body: string
  image: string
}
