import { fork, put, takeEvery } from 'redux-saga/effects'
import { categorySliceAction } from '../category/categoryAction'
import { fileUploadApi } from './fileUploadAPI'
import { fileUploadSliceAction } from './fileUploadAction'

function* uploadMiddleWare({ payload }: { payload: File }): any {
  try {
    const response = yield fileUploadApi.upload(payload)
    yield put(fileUploadSliceAction.uploadSuccessAction(response))
  } catch (e: any) {
    yield put(
      fileUploadSliceAction.uploadFailureAction({
        message: e.response.data.message,
      })
    )
  }
}

function* uploadSaga() {
  yield takeEvery(fileUploadSliceAction.uploadStart as any, uploadMiddleWare)
}

export default function* fileUploadSaga() {
  yield fork(uploadSaga)
}
