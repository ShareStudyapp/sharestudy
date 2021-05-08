import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import userSaga from '../sagas/user';
import postSaga from '../sagas/post';
import todoSaga from '../sagas/todo';
import userReducer from '../reducers/user';
import postReducer from '../reducers/post';
import todoReducer from '../reducers/todo';
import axios from 'axios';

const showLoading = () => {
  document.getElementById('loading').style.display = 'flex';
};
const hideLoading = () => {
  document.getElementById('loading').style.display = 'none';
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// Add a request interceptor

axios.interceptors.request.use(function (config) {
  showLoading();
  const token = window.localStorage.getItem('user');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    hideLoading();
    return response;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  }
);

const rootReducer = combineReducers({
  userReducer,
  postReducer,
  todoReducer
});

export function* rootSaga() {
  yield all([userSaga(), postSaga(), todoSaga()]);
}

export default rootReducer;
