import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import actions from './actions';
import api from 'containers/api';

const {
  LIST_REQUEST,
  LIST_SUCCESS,
  LIST_FAILURE,
  VIEW_REQUEST,
  VIEW_SUCCESS,
  VIEW_FAILURE,
  PARSE_REQUEST,
  PARSE_SUCCESS,
  PARSE_FAILURE,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  REMOVE_REQUEST,
  REMOVE_SUCCESS,
  REMOVE_FAILURE,
} = actions;

function* list({ payload }) {
  try {
    const response = yield call(api.post, '/member/list', payload);
    yield put({
      type: LIST_SUCCESS,
      payload: {
        members: response.data.items,
        meta: response.data.meta
      }
    });
  } catch (error) {
    yield put({
      type: LIST_FAILURE,
      payload: { error }
    });
  }
}

function* view({ payload }) {
  try {
    const response = yield call(api.post, '/member/view', payload);
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

function* parse({ payload }) {
  try {
    const response = yield call(api.post, '/member/parse', payload);
    yield put({
      type: PARSE_SUCCESS,
      payload: {
        parsed: response.data
      }
    });
  } catch (error) {
    yield put({
      type: PARSE_FAILURE,
      payload: { error }
    });
  }
}

function* upload({ payload }) {
  try {
    const response = yield call(api.post, '/member/import', payload);
    yield put({
      type: UPLOAD_SUCCESS,
      payload: {
        failed: response.data.failed
      }
    });
  } catch (error) {
    yield put({
      type: UPLOAD_FAILURE,
      payload: { error }
    });
  }
}

function* update({ payload }) {
  try {
    const response = yield call(api.post, '/member/update', payload);
    yield put({
      type: UPDATE_SUCCESS,
      payload: {
        member: response.data,
      }
    });
  } catch (error) {
    yield put({
      type: UPDATE_FAILURE,
      payload: { error }
    });
  }
}

function* remove({ payload }) {
  try {
    yield call(api.post, '/member/remove', payload);
    yield put({
      type: REMOVE_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: REMOVE_FAILURE,
      payload: { error }
    });
  }
}

export function* watchList() {
  yield takeEvery(LIST_REQUEST, list)
}

export function* watchView() {
  yield takeEvery(VIEW_REQUEST, view)
}

export function* watchParse() {
  yield takeEvery(PARSE_REQUEST, parse)
}

export function* watchUpload() {
  yield takeEvery(UPLOAD_REQUEST, upload)
}

export function* watchUpdate() {
  yield takeEvery(UPDATE_REQUEST, update)
}

export function* watchRemove() {
  yield takeEvery(REMOVE_REQUEST, remove)
}

function* memberSaga() {
  yield all([
    fork(watchList),
    fork(watchView),
    fork(watchParse),
    fork(watchUpload),
    fork(watchUpdate),
    fork(watchRemove),
  ]);
}

export default memberSaga;