export interface CategoryPayload {
  id?: string
  name: string
  image: string
}

export interface Category {
  _id?: string | null
  parentId?: string | undefined
  name: string
  image: string
}
