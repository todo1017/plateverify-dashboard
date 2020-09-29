import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import actions from './actions';
import api from 'containers/api';

const {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  VIEW_REQUEST,
  VIEW_SUCCESS,
  VIEW_FAILURE,
} = actions;

function* search({ payload }) {
  try {
    const response = yield call(api.post, '/alert/search', payload);
    yield put({
      type: SEARCH_SUCCESS,
      payload: {
        alerts: response.data.items,
        meta: response.data.meta,
        filter: payload
      }
    });
  } catch (error) {
    yield put({
      type: SEARCH_FAILURE,
      payload: { error }
    });
  }
}

function* view({ payload }) {
  try {
    const response = yield call(api.post, '/alert/view', payload);
    yield put({
      type: VIEW_SUCCESS,
      payload: {
        view: response.data,
      }
    });
  } catch (error) {
    yield put({
      type: VIEW_FAILURE,
      payload: { error }
    });
  }
}

export function* watchSearch() {
  yield takeEvery(SEARCH_REQUEST, search)
}

export function* watchView() {
  yield takeEvery(VIEW_REQUEST, view)
}

function* memberSaga() {
  yield all([
    fork(watchSearch),
    fork(watchView),
  ]);
}

export default memberSaga;