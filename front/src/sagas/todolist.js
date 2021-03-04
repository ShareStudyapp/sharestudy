import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_PLAN_REQUEST,
  ADD_PLAN_SUCCESS,
  ADD_PLAN_FAILURE,
  LOAD_PLAN_REQUEST,
  LOAD_PLAN_SUCCESS,
  LOAD_PLAN_FAILURE,
  UPDATE_TODOCHECK_REQUEST,
  UPDATE_TODOCHECK_SUCCESS,
  UPDATE_TODOCHECK_FAILURE,
  DELETE_TODOCHECK_REQUEST,
  DELETE_TODOCHECK_SUCCESS,
  DELETE_TODOCHECK_FAILURE,
  LOAD_TODOFEED_REQUEST,
  LOAD_TODOFEED_SUCCESS,
  LOAD_TODOFEED_FAILURE,
  LOAD_TODO_COUNT_REQUEST,
  LOAD_TODO_COUNT_SUCCESS,
  LOAD_TODO_COUNT_FAILURE
} from '../reducers/todolist';
function addTodoAPI(TodoListReq) {
  console.log('TodoListReq==', TodoListReq);
  return axios.post('/user/todo', TodoListReq);
}
function* addTodo(action) {
  console.log(action);
  try {
    const result = yield call(addTodoAPI, action.data);
    yield put({
      type: ADD_PLAN_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: ADD_PLAN_FAILURE,
      error: err.response.data
    });
  }
}
function loadTodosAPI(today) {
  return axios.get(`/todo/mytodolist/${today}`);
}
function* loadTodo(action) {
  try {
    const result = yield call(loadTodosAPI, action.data);
    //yield delay(1000);
    yield put({
      type: LOAD_PLAN_SUCCESS,
      data: result.data
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PLAN_FAILURE,
      data: err.response.data
    });
  }
}
function updateCheckAPI(todoId) {
  return axios.patch(`/todo/updateCheck/${todoId}`);
}
function* updateCheck(action) {
  try {
    const result = yield call(updateCheckAPI, action.data);
    //yield delay(1000);
    yield put({
      type: UPDATE_TODOCHECK_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: UPDATE_TODOCHECK_FAILURE,
      data: err.response.data
    });
  }
}
function deleteCheckAPI(todoId) {
  return axios.delete(`/todo/deleteTodo/${todoId}`);
}
function* deleteCheck(action) {
  try {
    const result = yield call(deleteCheckAPI, action.data);
    yield put({
      type: DELETE_TODOCHECK_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: DELETE_TODOCHECK_FAILURE,
      data: err.response.data
    });
  }
}
function todofeedAPI() {
  return axios.get('/todo/todofeedlist');
}
function* todofeed(action) {
  try {
    const result = yield call(todofeedAPI, action.data);
    yield put({
      type: LOAD_TODOFEED_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: LOAD_TODOFEED_FAILURE,
      data: err.response.data
    });
  }
}
function todoCountAPI(today) {
  return axios.get(`/todo/mytodolistcount/${today}`);
}
function* todoCount(action) {
  try {
    const result = yield call(todoCountAPI, action.data);
    yield put({
      type: LOAD_TODO_COUNT_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: LOAD_TODO_COUNT_FAILURE,
      data: err.response.data
    });
  }
}
function* watchAddTodo() {
  yield takeLatest(ADD_PLAN_REQUEST, addTodo);
}
function* watchLoadTodo() {
  yield takeLatest(LOAD_PLAN_REQUEST, loadTodo);
}
function* watchUpdateCheck() {
  yield takeLatest(UPDATE_TODOCHECK_REQUEST, updateCheck);
}
function* watchDeleteCheck() {
  yield takeLatest(DELETE_TODOCHECK_REQUEST, deleteCheck);
}
function* watchTodoFeed() {
  yield takeLatest(LOAD_TODOFEED_REQUEST, todofeed);
}
function* watchTodoCount() {
  yield takeLatest(LOAD_TODO_COUNT_REQUEST, todoCount);
}
export default function* todolistSaga() {
  yield all([
    fork(watchAddTodo),
    fork(watchLoadTodo),
    fork(watchUpdateCheck),
    fork(watchDeleteCheck),
    fork(watchTodoFeed),
    fork(watchTodoCount)
  ]);
}
