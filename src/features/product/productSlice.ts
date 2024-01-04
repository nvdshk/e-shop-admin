import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Product } from '../../interface/productInterface'
import { Response } from '../../interface/responseInterface'
import { Error } from '../../interface/errorInterface'

export interface InitialState {
  product: Product[]
  loading: boolean
  message: string
  error: Error | null
}

const initialState: InitialState = {
  product: [],
  loading: false,
  message: '',
  error: null,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    createProductStart: (state, action: PayloadAction<Product>) => {
      state.loading = true
    },
    createProductSuccess: (state, action: PayloadAction<Response<Product>>) => {
      state.loading = false
    },
    createProductFailure: (state, action: PayloadAction<Error>) => {
      state.loading = false
    },
    resetState: (state) => (state = initialState),
  },
})

export const {
  createProductStart,
  createProductSuccess,
  createProductFailure,
} = productSlice.actions
export default productSlice.reducer
