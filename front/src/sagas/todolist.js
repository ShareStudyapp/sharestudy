import { all, delay, fork, put, takeLatest,call } from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_PLAN_REQUEST,
    ADD_PLAN_SUCCESS,
    ADD_PLAN_FAILURE,
    LOAD_PLAN_REQUEST,
    LOAD_PLAN_SUCCESS,
    LOAD_PLAN_FAILURE
  } from '../reducers/todolist';
function addTodoAPI(todoList) {
  console.log(todoList)
    return axios.post('/user/todo',todoList);
}
function* addTodo(action) {
  console.log(action)
    try {
        const result = yield call(addTodoAPI, action.todoList);
        yield put({
        type: ADD_PLAN_SUCCESS,
        //data: result.data,
        });
        
    } catch (err) {
        yield put({
        type: ADD_PLAN_FAILURE,
        error: err.response.data,
        });
    }
}
function loadTodosAPI(today) {
  console.log('today',today)
  return axios.get(`/todo/mytodolist/${today}`);
}
function* loadTodo(action) {
  console.log(action.data)
  try {
      const result = yield call(loadTodosAPI, action.data);
      //yield delay(1000);
      yield put({
      type: LOAD_PLAN_SUCCESS,
      data: result.data,
      });
  } catch (err) {
      console.error(err);
      yield put({
      type: LOAD_PLAN_FAILURE,
      data: err.response.data,
      });
  }
}
function* watchAddTodo() {
    yield takeLatest(ADD_PLAN_REQUEST, addTodo);
}
function* watchLoadTodo() {
  yield takeLatest(LOAD_PLAN_REQUEST, loadTodo);
}
export default function* todolistSaga() {
  yield all([
    fork(watchAddTodo),
    fork(watchLoadTodo)
  ]);
}
