export interface Store {
  _id?: string
  name: string
  logo: string
  contactNo: string
  address: string
}

export interface Currency {
  _id?: string
  name: string
  symbol: string
  code: string
  exchangeRate: string
}
