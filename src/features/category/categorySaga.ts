import { fork, put, takeEvery } from 'redux-saga/effects'
import { CategoryPayload } from '../../interface/categoryInterface'
import { categoryApi } from './categoryAPI'
import { categorySliceAction } from './categoryAction'
import { fileUploadSliceAction } from '../upload/fileUploadAction'

function* createCategoryMiddleWare({
  payload,
}: {
  payload: CategoryPayload
}): any {
  try {
    const response = yield categoryApi.create(payload)
    yield put(fileUploadSliceAction.resetAction())
    yield put(categorySliceAction.createCategorySuccessAction(response))
  } catch (e: any) {
    console.trace(e)
    console.log(e)
    yield put(
      categorySliceAction.createCategoryFailureAction({
        message: e.response.data.message,
      })
    )
  }
}

function* createCategorySaga() {
  yield takeEvery(
    categorySliceAction.createCategoryStart as any,
    createCategoryMiddleWare
  )
}

function* updateCategoryMiddleWare({
  payload,
}: {
  payload: CategoryPayload
}): any {
  try {
    const response = yield categoryApi.update(payload)
    yield put(fileUploadSliceAction.resetAction())
    yield put(categorySliceAction.updateCategorySuccessAction(response))
  } catch (e: any) {
    console.trace(e)
    console.log(e)
    yield put(
      categorySliceAction.updateCategoryFailureAction({
        message: e.response.data.message,
      })
    )
  }
}

function* updateCategorySaga() {
  yield takeEvery(
    categorySliceAction.updateCategoryStart as any,
    updateCategoryMiddleWare
  )
}

function* getCategoryMiddleWare(): any {
  try {
    const response = yield categoryApi.get()
    yield put(categorySliceAction.getCategorySuccessAction(response))
  } catch (e: any) {
    yield put(
      categorySliceAction.getCategoryFailureAction({
        message: e.response.data.message,
      })
    )
  }
}

function* getCategorySaga() {
  yield takeEvery(
    categorySliceAction.getCategoryStart as any,
    getCategoryMiddleWare
  )
}

function* deleteCategoryMiddleWare({ payload }: { payload: string }): any {
  try {
    const response = yield categoryApi.delete(payload)
    yield put(categorySliceAction.deleteCategorySuccessAction(payload))
  } catch (e: any) {
    yield put(
      categorySliceAction.deleteCategoryFailureAction({
        message: e.response.data.message,
      })
    )
  }
}

function* deleteCategorySaga() {
  yield takeEvery(
    categorySliceAction.deleteCategoryStart as any,
    deleteCategoryMiddleWare
  )
}
export default function* categorySaga() {
  yield fork(createCategorySaga)
  yield fork(getCategorySaga)
  yield fork(updateCategorySaga)
  yield fork(deleteCategorySaga)
}
