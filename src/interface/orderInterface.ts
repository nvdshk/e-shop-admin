import { Address } from './addressInterface'
import { Product } from './productInterface'

export interface Order {
  _id: string
  user: {
    name: string
    email: string
  }
  items: [Item]
  address: Address
  totalAmount: number
  paymentType: string
  paymentStatus: string
  orderStatus: [OrderStatus]
  createdAt: string
}

export interface OrderStatus {
  type: string
  isCompleted: string
  _id: string
}

export interface Item {
  quantity: number
  price: number
  total: number
  product: {
    _id?: string
    name: string
    image: string
    images: string[]
    color: string
    price: string
    size: string[]
    shippingFee: string
  }
  _id: string
}

export interface OrderStatusPayload {
  _id: string
  statusId: string
}
