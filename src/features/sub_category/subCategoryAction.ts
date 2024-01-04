import { Error } from '../../interface/errorInterface'
import { Params } from '../../interface/paramsInteface'
import { Response } from '../../interface/responseInterface'
import {
  SubCategory,
  SubCategoryPayload,
} from '../../interface/subCategoryInterface'

export const subCategorySliceAction = {
  createSubCategoryStart: 'subCategory/createSubCategoryStart',
  createSubCategoryStartAction: (payload: SubCategoryPayload) => ({
    type: subCategorySliceAction.createSubCategoryStart,
    payload,
  }),
  createSubCategorySuccess: 'subCategory/createSubCategorySuccess',
  createSubCategorySuccessAction: (payload: Response<SubCategory>) => ({
    type: subCategorySliceAction.createSubCategorySuccess,
    payload,
  }),
  createSubCategoryFailure: 'subCategory/createSubCategoryFailure',
  createSubCategoryFailureAction: (payload: Error) => ({
    type: subCategorySliceAction.createSubCategoryFailure,
    payload,
  }),
  getSubCategoryStart: 'subCategory/getSubCategoryStart',
  getSubCateogyrStartAction: (payload: Params) => ({
    type: subCategorySliceAction.getSubCategoryStart,
    payload,
  }),
  getSubCategorySuccess: 'subCategory/getSubCategorySuccess',
  getSubCategorySuccessAction: (payload: Response<SubCategory>) => ({
    type: subCategorySliceAction.getSubCategorySuccess,
    payload,
  }),
  getSubCategoryFailure: 'subCategory/getSubCategoryFailure',
  getSubCategoryFailureAction: (payload: Error) => ({
    type: subCategorySliceAction.getSubCategoryFailure,
    payload,
  }),
}
