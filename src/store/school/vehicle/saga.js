import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import actions from './actions';
import api from 'api';

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
  FLAG_REQUEST,
  FLAG_SUCCESS,
  FLAG_FAILURE,
  FLAG_COMPLETE
} = actions;

function* list({ payload }) {
  try {
    const response = yield call(api.post, '/vehicle/list', payload);
    yield put({
      type: LIST_SUCCESS,
      payload: {
        vehicles: response.data.items,
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
    const response = yield call(api.post, '/vehicle/view', payload);
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
    const response = yield call(api.post, '/vehicle/parse', payload);
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
    const response = yield call(api.post, '/vehicle/import', payload);
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
    const response = yield call(api.post, '/vehicle/update', payload);
    yield put({
      type: UPDATE_SUCCESS,
      payload: {
        view: response.data,
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
    yield call(api.post, '/vehicle/remove', payload);
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

function* flag({ payload }) {
  try {
    yield call(api.post, '/vehicle/flag', payload);
    yield put({ type: FLAG_SUCCESS });
    yield put({ type: FLAG_COMPLETE });
  } catch (error) {
    yield put({
      type: FLAG_FAILURE,
      payload: { error }
    });
    yield put({ type: FLAG_COMPLETE });
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

export function* watchFlag() {
  yield takeEvery(FLAG_REQUEST, flag)
}

function* vehicleSaga() {
  yield all([
    fork(watchList),
    fork(watchView),
    fork(watchParse),
    fork(watchUpload),
    fork(watchUpdate),
    fork(watchRemove),
    fork(watchFlag),
  ]);
}

export default vehicleSaga;