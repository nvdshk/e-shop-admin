export interface Product {
  _id?: string
  name: string
  image: string
  images: string[]
  color: string
  price: string
  size: string[]
  description: string
  features: string[]
  stock: string
  tax?: number
  categories: string[]
}
