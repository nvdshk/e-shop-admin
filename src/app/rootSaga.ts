import { all } from 'redux-saga/effects'
import authSaga from '../features/auth/authSaga'
import categorySaga from '../features/category/categorySaga'
import fileUploadSaga from '../features/upload/fileUploadSaga'
import subCategorySaga from '../features/sub_category/subCategorySaga'
import productSaga from '../features/product/productSaga'

export default function* rootSaga() {
  yield all([
    authSaga(),
    categorySaga(),
    subCategorySaga(),
    productSaga(),
    fileUploadSaga(),
  ])
}
