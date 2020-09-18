import { all, delay,call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../reducers/user';




function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  return axios.post('/api/auth/signup',signUpData);
}

function* signUp(action) {
  try {
    //console.log(action)
    yield call(signUpAPI, action.data);
    yield delay(2000);
    //throw new Error('에러에러에러');
    yield put({ // put은 dispatch 동일
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) { // loginAPI 실패
    console.error(e); 
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchSignUp),
  ]);
}
