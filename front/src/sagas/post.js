import axios from 'axios';
import shortId from 'shortid';
import { all, delay, fork, put, takeLatest,takeEvery, throttle ,call} from 'redux-saga/effects';
import {
    generateDummyPost,
    generateDummyGallary,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    LOAD_GALLARY_REQUEST,
    LOAD_GALLARY_SUCCESS,
    LOAD_GALLARY_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_FAILURE,
     UPLOAD_IMAGES_SUCCESS
  } from '../reducers/post';

function loadPostsAPI(data) {
    return axios.get('/api/posts', data);
}
function uploadImagesAPI(data) {
  console.log(data)
  return axios.post('/feed/upload', data);
}
function* loadPosts(action) {
    try {
        // const result = yield call(loadPostsAPI, action.data);
        yield delay(1000);
        yield put({
        type: LOAD_POSTS_SUCCESS,
        data: generateDummyPost(10),
        });
    } catch (err) {
        console.error(err);
        yield put({
        type: LOAD_POSTS_FAILURE,
        data: err.response.data,
        });
    }
}
function* loadGallary(action) {
    try {
        // const result = yield call(loadPostsAPI, action.data);
        yield delay(1000);
        yield put({
        type: LOAD_GALLARY_SUCCESS,
        data: action.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
        type: LOAD_GALLARY_FAILURE,
        data: err.response.data,
        });
    }
}
function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}
function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchLoadGallary() {
    yield throttle(5000, LOAD_GALLARY_REQUEST, loadGallary);
}
function* watchUploadImages() {
    yield takeEvery(UPLOAD_IMAGES_REQUEST, uploadImages);
}

export default function* postSaga() {
  yield all([
    fork(watchUploadImages),
    fork(watchLoadPosts),
  ]);
}
