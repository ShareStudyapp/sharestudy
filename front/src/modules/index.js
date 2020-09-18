import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import userSaga from '../sagas/user';
import userReducer from '../reducers/user';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
const rootReducer = combineReducers({
  userReducer
});

export function* rootSaga() {
  yield all([
    userSaga(),
  ]);
}

export default rootReducer;