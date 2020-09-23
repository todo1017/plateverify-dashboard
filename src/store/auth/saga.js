import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import actions from './actions';
import api from 'containers/api';

const {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILURE,
  TOKEN_END,
  LOGIN_REQUEST,
  LOGIN_FAILURE
} = actions;

function* tokenCheck() {
  try {
    const response = yield call(api.post, '/auth/check');
    yield put({
      type: TOKEN_SUCCESS,
      payload: {
        user: response.data
      }
    });
    yield put({ type: TOKEN_END });
  } catch (error) {
    yield put({type: TOKEN_FAILURE, payload: {}});
    yield put({ type: TOKEN_END });
  }
}

function* loginCheck({ payload }) {
  try {
    const response = yield call(api.post, '/auth/login', payload);
    localStorage.setItem('token', response.data.token);
    window.location.href = '/dashboard';
  } catch (error) {
    yield put({type: LOGIN_FAILURE, payload: {}});
  }
}

export function* watchTokenCheck() {
  yield takeEvery(TOKEN_REQUEST, tokenCheck)
}

export function* watchLoginCheck() {
  yield takeEvery(LOGIN_REQUEST, loginCheck)
}

function* authSaga() {
  yield all([
    fork(watchTokenCheck),
    fork(watchLoginCheck),
  ]);
}

export default authSaga;
