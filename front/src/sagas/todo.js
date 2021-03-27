import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  ADD_TODO_COMMENT_REQUEST,
  ADD_TODO_COMMENT_SUCCESS,
  ADD_TODO_COMMENT_FAILURE,
  LOAD_TODO_REQUEST,
  LOAD_TODO_SUCCESS,
  LOAD_TODO_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  DELETE_TODO_COMMENT_REQUEST,
  DELETE_TODO_COMMENT_SUCCESS,
  DELETE_TODO_COMMENT_FAILURE,
  UPDATE_TODO_COMMENT_REQUEST,
  UPDATE_TODO_COMMENT_SUCCESS,
  UPDATE_TODO_COMMENT_FAILURE
} from '../reducers/todo';
function addTodoAPI(data) {
  return axios.post('/user/todo', data);
}
function* addTodo(action) {
  try {
    const result = yield call(addTodoAPI, action.data);
    yield put({
      type: ADD_TODO_SUCCESS,
      data: result?.data
    });
  } catch (err) {
    yield put({
      type: ADD_TODO_FAILURE,
      error: err?.response?.data
    });
  }
}
function addTodoCommentAPI(data) {
  return axios.post('/user/todoComment', data);
}
function* addTodoComment(action) {
  try {
    const result = yield call(addTodoCommentAPI, action.data);
    yield put({
      type: ADD_TODO_COMMENT_SUCCESS,
      data: result?.data
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_TODO_COMMENT_FAILURE,
      error: err?.response?.data
    });
  }
}

function loadTodoAPI(today) {
  return axios.get(`/todo/mytodolist/${today}`);
}
function* loadTodo(action) {
  try {
    const result = yield call(loadTodoAPI, action.data);
    //yield delay(1000);
    yield put({
      type: LOAD_TODO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_TODO_FAILURE,
      data: err.response.data
    });
  }
}

function deleteTodoAPI(todoId) {
  return axios.delete(`/user/todo/${todoId}`);
}
function* deleteTodo(action) {
  try {
    const result = yield call(deleteTodoAPI, action.data);
    yield put({
      type: DELETE_TODO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: DELETE_TODO_FAILURE,
      data: err.response.data
    });
  }
}

function updateTodoAPI(data) {
  return axios.patch(`/user/todo/${data.id}`, data);
}
function* updateTodo(action) {
  try {
    const result = yield call(updateTodoAPI, action.data);
    yield put({
      type: UPDATE_TODO_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: UPDATE_TODO_FAILURE,
      data: err.response.data
    });
  }
}

function deleteTodoCommentAPI(todoId) {
  return axios.delete(`/user/todoComment/${todoId}`);
}
function* deleteTodoComment(action) {
  try {
    const result = yield call(deleteTodoCommentAPI, action.data);
    yield put({
      type: DELETE_TODO_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: DELETE_TODO_COMMENT_FAILURE,
      data: err.response.data
    });
  }
}

function updateTodoCommentAPI(data) {
  return axios.patch(`/user/todoComment/${data.id}`, data);
}
function* updateTodoComment(action) {
  try {
    const result = yield call(updateTodoCommentAPI, action.data);
    yield put({
      type: UPDATE_TODO_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: UPDATE_TODO_COMMENT_FAILURE,
      data: err.response.data
    });
  }
}

function* watchAddTodo() {
  yield takeLatest(ADD_TODO_REQUEST, addTodo);
}
function* watchAddTodoComment() {
  yield takeLatest(ADD_TODO_COMMENT_REQUEST, addTodoComment);
}
function* watchLoadTodo() {
  yield takeLatest(LOAD_TODO_REQUEST, loadTodo);
}
function* watchDeleteTodo() {
  yield takeLatest(DELETE_TODO_REQUEST, deleteTodo);
}
function* watchUpdateTodo() {
  yield takeLatest(UPDATE_TODO_REQUEST, updateTodo);
}
function* watchDeleteTodoComment() {
  yield takeLatest(DELETE_TODO_COMMENT_REQUEST, deleteTodoComment);
}
function* watchUpdateTodoComment() {
  yield takeLatest(UPDATE_TODO_COMMENT_REQUEST, updateTodoComment);
}
export default function* todoSaga() {
  yield all([
    fork(watchAddTodo),
    fork(watchAddTodoComment),
    fork(watchLoadTodo),
    fork(watchDeleteTodo),
    fork(watchUpdateTodo),
    fork(watchDeleteTodoComment),
    fork(watchUpdateTodoComment)
  ]);
}
