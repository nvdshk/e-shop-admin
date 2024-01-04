import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Error } from '../../interface/errorInterface'

export interface InitialState {
  loading: boolean
  data?: {
    success: boolean
    url: string
  } | null
  error: Error | null
}

const initialState: InitialState = {
  loading: false,
  data: null,
  error: null,
}

const fileUploadSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    uploadStart: (state, action: PayloadAction<File>) => {
      state.loading = true
    },
    uploadSuccess: (
      state,
      action: PayloadAction<{ success: boolean; url: string }>
    ) => {
      state.loading = false
      state.data = action.payload
    },
    uploadFailure(state, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload
    },
    reset: (state) => {
      state = initialState
    },
  },
})

export const { uploadStart, uploadSuccess, uploadFailure, reset } =
  fileUploadSlice.actions
export default fileUploadSlice.reducer
