import { Error } from '../../interface/errorInterface'

export const fileUploadSliceAction = {
  uploadStart: 'file/uploadStart',
  uploadStartAction: (payload: File) => ({
    type: fileUploadSliceAction.uploadStart,
    payload,
  }),
  uploadSuccess: 'file/uploadSuccess',
  uploadSuccessAction: (payload: { success: boolean; url: string }) => ({
    type: fileUploadSliceAction.uploadSuccess,
    payload,
  }),
  uploadFailure: 'file/uploadFailure',
  uploadFailureAction: (payload: Error) => ({
    type: fileUploadSliceAction.uploadFailure,
    payload,
  }),
  reset: 'file/reset',
  resetAction: () => ({
    type: fileUploadSliceAction.reset,
  }),
}
