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

export interface MainCategory {
  id: string
  name: string
  image: string
  children: Array<SubCategory>
}

export interface SubCategory {
  _id?: string | null
  parentId?: string | undefined
  parentCategoryName?: string
  name: string
  image: string
}
