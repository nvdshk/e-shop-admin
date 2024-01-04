import { Category, CategoryPayload } from '../../interface/categoryInterface'
import { Error } from '../../interface/errorInterface'

export const categorySliceAction = {
  createCategoryStart: 'category/createCategoryStart',
  createCategoryStartAction: (payload: CategoryPayload) => ({
    type: categorySliceAction.createCategoryStart,
    payload,
  }),
  createCategorySuccess: 'category/createCategorySuccess',
  createCategorySuccessAction: (payload: any) => ({
    type: categorySliceAction.createCategorySuccess,
    payload,
  }),
  createCategoryFailure: 'category/createCategoryFailure',
  createCategoryFailureAction: (payload: Error) => ({
    type: categorySliceAction.createCategoryFailure,
    payload,
  }),
  getCategoryStart: 'category/getCategoryStart',
  getCategoryStartAction: () => ({
    type: categorySliceAction.getCategoryStart,
  }),
  getCategorySuccess: 'category/getCategorySuccess',
  getCategorySuccessAction: (payload: Category) => ({
    type: categorySliceAction.getCategorySuccess,
    payload,
  }),
  getCategoryFailure: 'category/getCategoryFailure',
  getCategoryFailureAction: (payload: Error) => ({
    type: categorySliceAction.getCategoryFailure,
    payload,
  }),
  updateCategoryStart: 'category/updateCategoryStart',
  updateCategoryStartAction: (payload: CategoryPayload) => ({
    type: categorySliceAction.updateCategoryStart,
    payload,
  }),
  updateCategorySuccess: 'category/updateCategorySuccess',
  updateCategorySuccessAction: (payload: string) => ({
    type: categorySliceAction.updateCategorySuccess,
    payload,
  }),
  updateCategoryFailure: 'category/updateCategoryFailure',
  updateCategoryFailureAction: (payload: Error) => ({
    type: categorySliceAction.updateCategoryFailure,
    payload,
  }),
  deleteCategoryStart: 'category/deleteCategoryStart',
  deleteCategoryStartAction: (payload: string) => ({
    type: categorySliceAction.deleteCategoryStart,
    payload,
  }),
  deleteCategorySuccess: 'category/deleteCategorySuccess',
  deleteCategorySuccessAction: (payload: string) => ({
    type: categorySliceAction.deleteCategorySuccess,
    payload,
  }),
  deleteCategoryFailure: 'category/deleteCategoryFailure',
  deleteCategoryFailureAction: (payload: Error) => ({
    type: categorySliceAction.deleteCategoryFailure,
    payload,
  }),
  reset: 'category/reset',
  resetAction: () => ({
    type: categorySliceAction.reset,
  }),
}
