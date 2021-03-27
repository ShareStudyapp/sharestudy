import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import userSaga from '../sagas/user';
import postSaga from '../sagas/post';
import todoSaga from '../sagas/todo';
import userReducer from '../reducers/user';
import postReducer from '../reducers/post';
import todoReducer from '../reducers/todo';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// Add a request interceptor

axios.interceptors.request.use(function (config) {
  const token = window.sessionStorage.getItem('user');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

const rootReducer = combineReducers({
  userReducer,
  postReducer,
  todoReducer
});

export function* rootSaga() {
  yield all([userSaga(), postSaga(), todoSaga()]);
}

export default rootReducer;
