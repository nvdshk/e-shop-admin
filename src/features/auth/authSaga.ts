import { fork, put, takeEvery } from 'redux-saga/effects'
import authApi from './authAPI'
import { LoginPayload, Token } from '../../interface/userInteface'
import { authSliceAction } from '../auth/authAction'

function* loginMiddleWare({ payload }: { payload: LoginPayload }): any {
  try {
    const token: Token = yield authApi.login(payload)
    yield console.log('user token:', token)
    yield put(authSliceAction.setTokenAction(token))
  } catch (e: any) {
    console.trace(e)
    console.log(e)
    // const err = error as AxiosError
    // // console.log(err.response?.data)
    // if (!err?.response) {
    //     console.log("No Server Response");
    // } else if (err.response?.status === 400) {
    //     console.log("Missing Username or Password");
    // } else {
    //     console.log("Login Failed");
    // }
    yield put(
      authSliceAction.loginFailedAction({
        message: e.response.data.message,
      })
    )
  }
}

function* loginSaga() {
  yield takeEvery(authSliceAction.login as any, loginMiddleWare)
}

function* logOutMiddleWare() {
  //TODO: authApi.logout
}

function* logOutSaga() {
  yield takeEvery(authSliceAction.logout as any, logOutMiddleWare)
}

export default function* authSaga() {
  yield fork(loginSaga)
  yield fork(logOutSaga)
  // yield fork(forgetPasswordSaga);
}
