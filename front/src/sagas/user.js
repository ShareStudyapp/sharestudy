import { all, fork, put, takeLatest, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAILURE,
  UPLOAD_PROFILE_IMAGES_REQUEST,
  UPLOAD_PROFILE_IMAGES_SUCCESS,
  UPLOAD_PROFILE_IMAGES_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_CANCLE_REQUEST,
  FOLLOW_CANCLE_SUCCESS,
  FOLLOW_CANCLE_FAILURE,
  FOLLOWER_LIST_REQUEST,
  FOLLOWER_LIST_SUCCESS,
  FOLLOWER_LIST_FAILURE,
  FOLLOWING_LIST_REQUEST,
  FOLLOWING_LIST_SUCCESS,
  FOLLOWING_LIST_FAILURE,
  OTHER_USER_INFO_REQUEST,
  OTHER_USER_INFO_SUCCESS,
  OTHER_USER_INFO_FAILURE,
  USERINFO_UPDATE_REQUEST,
  USERINFO_UPDATE_SUCCESS,
  USERINFO_UPDATE_FAILURE,
  SEARCH_USERS_REQUEST,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_FAILURE
} from '../reducers/user';

function signUpAPI(signUpData) {
  // 서버에 요청을 보내는 부분
  console.log(signUpData);
  return axios.post('/api/auth/signup', signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    //yield delay(2000);
    yield put({
      // put은 dispatch 동일
      type: SIGN_UP_SUCCESS
    });
  } catch (e) {
    // loginAPI 실패
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e
    });
  }
}
function logInAPI(data) {
  return axios.post('/api/auth/signin', data);
}
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    window.localStorage.setItem('user', result.data.jwt);
    window.localStorage.setItem('login_valid', 'temp');
    const result2 = yield call(userInfoAPI);

    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
      data2: result2.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data
    });
  }
}
function logOutAPI(token) {
  return axios.post('/api/auth/logout', token);
}
function* logOut(action) {
  try {
    yield call(logOutAPI, action.data);
    window.localStorage.removeItem('login_valid');
    window.localStorage.removeItem('user');
    // window.localStorage.removeItem('userInfo');
    // window.localStorage.setItem('userInfo',[]);
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data
    });
  }
}
function userInfoAPI() {
  return axios.get('/api/auth/userinfo');
}
function* userInfo() {
  try {
    const result = yield call(userInfoAPI);
    yield put({
      type: USER_INFO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    window.localStorage.removeItem('login_valid');
    window.localStorage.removeItem('user');
    console.error(err);
    yield put({
      type: USER_INFO_FAILURE,
      error: err?.response?.data
    });
  }
}
function uploadProfileImagesAPI(data) {
  return axios.post('/api/auth/profileimage', data);
}
function* uploadProfileImages(action) {
  try {
    const result = yield call(uploadProfileImagesAPI, action.data);

    yield put({
      type: UPLOAD_PROFILE_IMAGES_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: UPLOAD_PROFILE_IMAGES_FAILURE,
      error: err.response.data
    });
  }
}
function followAPI(id) {
  return axios.post(`/user/following/${id}`);
}
function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data
    });
  }
}
function followCancleAPI(id) {
  return axios.delete(`/user/following/${id}`);
}
function* followCancle(action) {
  try {
    const result = yield call(followCancleAPI, action.data);
    yield put({
      type: FOLLOW_CANCLE_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: FOLLOW_CANCLE_FAILURE,
      error: err.response.data
    });
  }
}
function followerListAPI(id) {
  return axios.get(`/user/followerlist/${id}`);
}
function* followerList(action) {
  try {
    const result = yield call(followerListAPI, action.data);
    yield put({
      type: FOLLOWER_LIST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: FOLLOWER_LIST_FAILURE,
      error: err.response.data
    });
  }
}
function followingListAPI(id) {
  return axios.get(`/user/followinglist/${id}`);
}
function* followingList(action) {
  try {
    const result = yield call(followingListAPI, action.data);
    yield put({
      type: FOLLOWING_LIST_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: FOLLOWING_LIST_FAILURE,
      error: err.response.data
    });
  }
}
function otherUserInfoAPI(id) {
  return axios.get(`/user/otheruserInfo/${id}`);
}
function* otherUserInfo(action) {
  try {
    const result = yield call(otherUserInfoAPI, action.data);
    yield put({
      type: OTHER_USER_INFO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: OTHER_USER_INFO_FAILURE,
      error: err.response.data
    });
  }
}
function userInfoUpdateAPI(data) {
  console.log(data);
  return axios.patch('/user/updateUser', data);
}
function* userInfoUpdate(action) {
  try {
    const result = yield call(userInfoUpdateAPI, action.data);
    yield put({
      type: USERINFO_UPDATE_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: USERINFO_UPDATE_FAILURE,
      error: err.response.data
    });
  }
}

function searchUsersAPI(nickname) {
  return axios.get(`/user/userSearch/${nickname}`);
}
function* searchUsers(action) {
  try {
    const result = yield call(searchUsersAPI, action.data);
    yield put({
      type: SEARCH_USERS_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: SEARCH_USERS_FAILURE,
      error: err.response.data
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchUserInfo() {
  yield takeLatest(USER_INFO_REQUEST, userInfo);
}
function* watchProfileUploadImages() {
  yield takeEvery(UPLOAD_PROFILE_IMAGES_REQUEST, uploadProfileImages);
}
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchFollowCancle() {
  yield takeLatest(FOLLOW_CANCLE_REQUEST, followCancle);
}
function* watchFollowerList() {
  yield takeLatest(FOLLOWER_LIST_REQUEST, followerList);
}
function* watchFollowingList() {
  yield takeLatest(FOLLOWING_LIST_REQUEST, followingList);
}
function* watchOtherUserInfo() {
  yield takeLatest(OTHER_USER_INFO_REQUEST, otherUserInfo);
}
function* watchUserInfoUpdate() {
  yield takeLatest(USERINFO_UPDATE_REQUEST, userInfoUpdate);
}

function* watchSearchUsers() {
  yield takeLatest(SEARCH_USERS_REQUEST, searchUsers);
}
export default function* userSaga() {
  yield all([
    fork(watchSignUp),
    fork(watchLogIn),
    fork(watchUserInfo),
    fork(watchLogOut),
    fork(watchProfileUploadImages),
    fork(watchFollow),
    fork(watchFollowCancle),
    fork(watchFollowerList),
    fork(watchFollowingList),
    fork(watchOtherUserInfo),
    fork(watchUserInfoUpdate),
    fork(watchSearchUsers)
  ]);
}
