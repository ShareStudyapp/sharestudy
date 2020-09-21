import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import userSaga from '../sagas/user';
import postSaga from '../sagas/post';
import userReducer from '../reducers/user';
import postReducer from '../reducers/post';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
const rootReducer = combineReducers({
  userReducer,
  postReducer
});

export function* rootSaga() {
  yield all([
    userSaga(),
    postSaga()
  ]);
}

export default rootReducer;