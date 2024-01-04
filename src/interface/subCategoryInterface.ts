export interface SubCategoryPayload {
  name: string
  image: string
  parentId: string
}

export interface SubCategory {
  _id?: string | null
  parentId?: string | undefined
  name: string
  image: string
}
