import { fork, put, takeEvery } from 'redux-saga/effects'
import { Product } from '../../interface/productInterface'
import { productApi } from './productAPI'
import { fileUploadSliceAction } from '../upload/fileUploadAction'
import { productSliceAction } from './productAction'

function* createProductMiddleWare({ payload }: { payload: Product }): any {
  try {
    const response = yield productApi.create(payload)
    yield put(fileUploadSliceAction.resetAction())
    yield put(productSliceAction.createProductSuccessAction(response))
  } catch (e: any) {
    yield put(
      productSliceAction.createProductFailureAction({
        message: e.response.data.message,
      })
    )
  }
}

function* createProductSaga() {
  yield takeEvery(
    productSliceAction.createProductStart as any,
    createProductMiddleWare
  )
}

export default function* productSaga() {
  yield fork(createProductSaga)
}
