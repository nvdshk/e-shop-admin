import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import categoryReducer from '../features/category/categorySlice'
import subCategoryReducer from '../features/sub_category/subCategorySlice'
import productReducer from '../features/product/productSlice'
import fileUploadReducer from '../features/upload/fileUploadSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import { apiSlice } from '../features/api/apiSlice'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    product: productReducer,
    file: fileUploadReducer,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware).concat(apiSlice.middleware),
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
