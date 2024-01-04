import { fork, put, takeEvery } from 'redux-saga/effects'
import { SubCategoryPayload } from '../../interface/subCategoryInterface'
import { fileUploadSliceAction } from '../upload/fileUploadAction'
import { subCategoryApi } from './subCategoryAPI'
import { subCategorySliceAction } from './subCategoryAction'
import { Params } from '../../interface/paramsInteface'

function* createSubCategoryMiddleWare({
  payload,
}: {
  payload: SubCategoryPayload
}): any {
  try {
    const response = yield subCategoryApi.create(payload)
    yield put(fileUploadSliceAction.resetAction())
    yield put(subCategorySliceAction.createSubCategorySuccessAction(response))
  } catch (e: any) {
    console.trace(e)
    console.log(e)
    yield put(
      subCategorySliceAction.createSubCategoryFailureAction({
        message: e.response.data.message,
      })
    )
  }
}

function* createSubCategorySaga() {
  yield takeEvery(
    subCategorySliceAction.createSubCategoryStart as any,
    createSubCategoryMiddleWare
  )
}

function* getSubCategoryMiddleWare({ payload }: { payload: Params }): any {
  try {
    const response = yield subCategoryApi.get(payload)
    yield put(subCategorySliceAction.getSubCategorySuccessAction(response))
  } catch (e: any) {
    yield put(
      subCategorySliceAction.getSubCategoryFailureAction({
        message: e.response.data.message,
      })
    )
  }
}

function* getSubCategorySaga() {
  yield takeEvery(
    subCategorySliceAction.getSubCategoryStart as any,
    getSubCategoryMiddleWare
  )
}

export default function* subCategorySaga() {
  yield fork(createSubCategorySaga)
  yield fork(getSubCategorySaga)
}
