import { Error } from '../../interface/errorInterface'
import { Product } from '../../interface/productInterface'
import { Response } from '../../interface/responseInterface'

export const productSliceAction = {
  createProductStart: 'product/createProductStart',
  createProductStartAction: (payload: Product) => ({
    type: productSliceAction.createProductStart,
    payload,
  }),
  createProductSuccess: 'product/createProductSuccess',
  createProductSuccessAction: (payload: Response<Product>) => ({
    type: productSliceAction.createProductSuccess,
    payload,
  }),
  createProductFailure: 'product/createProductFailure',
  createProductFailureAction: (payload: Error) => ({
    type: productSliceAction.createProductFailure,
    payload,
  }),
}
