import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Category, CategoryPayload } from '../../interface/categoryInterface'
import { Error } from '../../interface/errorInterface'

export interface InitialState {
  category: Category[]
  loading: boolean
  update: {
    loading: boolean
    successMessage: string
    error: Error | null
  }
  successMessage: string
  error: Error | null
}

const initialState: InitialState = {
  category: [],
  loading: false,
  successMessage: '',
  error: null,
  update: {
    loading: false,
    successMessage: '',
    error: null,
  },
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    createCategoryStart: (state, action: PayloadAction<CategoryPayload>) => {
      state.loading = true
    },
    createCategorySuccess: (
      state,
      action: PayloadAction<{ succes: boolean; data: Category }>
    ) => {
      state.loading = false
      state.category.push(action.payload.data)
    },
    createCategoryFailure: (state, action: PayloadAction<Error>) => {
      state.loading = false
      state.error = action.payload
    },

    getCategoryStart: (state) => {
      // state.loading = true
    },
    getCategorySuccess: (
      state,
      action: PayloadAction<{ success: boolean; data: Category[] }>
    ) => {
      // state.loading = false
      state.category = action.payload.data
    },
    getCategoryFailure: (state, action: PayloadAction<Error>) => {
      // state.loading = false
      state.error = action.payload
    },
    updateCategoryStart: (state, action: PayloadAction<string>) => {
      state.update.loading = true
    },

    updateCategorySuccess: (state, action: PayloadAction<string>) => {
      state.update.loading = false
      state.update.successMessage = 'Category Updated Successfully'
    },
    updateCategoryFailed: (state, action: PayloadAction<Error>) => {
      state.update.loading = false
      state.update.error = action.payload
    },

    deleteCategoryStart: (state, action: PayloadAction<string>) => {
      // state.loading = true
    },
    deleteCategorySuccess: (state, action: PayloadAction<string>) => {
      // state.loading = false
      const removeCategory = state.category.filter(
        (item: Category) => item._id !== action.payload
      )
      state.category = removeCategory
      state.successMessage = 'Category Deleted Successfully'
    },
    deleteCategoryFailure: (state, action: PayloadAction<Error>) => {
      // state.loading = false
      state.error = action.payload
    },
    reset: (state) => {
      state.update = {
        loading: false,
        successMessage: '',
        error: null,
      }
    },
  },
})

export const {
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailure,
} = categorySlice.actions
export default categorySlice.reducer
