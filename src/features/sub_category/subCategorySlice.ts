import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  SubCategory,
  SubCategoryPayload,
} from '../../interface/subCategoryInterface'
import { Response } from '../../interface/responseInterface'

export interface IntialState {
  subCategory: SubCategory[]
  loading: boolean
  successMessage: string
  error: Error | null
}

const initialState: IntialState = {
  subCategory: [],
  loading: false,
  successMessage: '',
  error: null,
}

const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState,
  reducers: {
    createSubCategoryStart: (
      state,
      action: PayloadAction<SubCategoryPayload>
    ) => {
      state.loading = true
    },
    createSubCategorySuccess: (
      state,
      action: PayloadAction<Response<SubCategory>>
    ) => {
      state.loading = false
      state.subCategory.push(action.payload.data!)
    },
    createSubCategoryFailure: (state, action: PayloadAction<Error>) => {
      state.loading = false
      state.error = action.payload
    },

    getSubCategoryStart: (state, action: PayloadAction<SubCategoryPayload>) => {
      // state.loading = true
    },
    getSubCategorySuccess: (
      state,
      action: PayloadAction<Response<SubCategory[]>>
    ) => {
      // state.loading = false
      state.subCategory = action.payload.data!
    },
    getSubCategoryFailure: (state, action: PayloadAction<Error>) => {
      // state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  createSubCategoryStart,
  createSubCategorySuccess,
  createSubCategoryFailure,
} = subCategorySlice.actions
export default subCategorySlice.reducer
