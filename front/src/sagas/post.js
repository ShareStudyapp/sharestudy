import axios from 'axios';
import shortId from 'shortid';
import { all, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import {
    generateDummyPost,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
  } from '../reducers/post';

function loadPostsAPI(data) {
    return axios.get('/api/posts', data);
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
function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

export default function* postSaga() {
yield all([
        fork(watchLoadPosts),
    ]);
}
  