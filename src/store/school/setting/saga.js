import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import actions from './actions';
import api from 'containers/api';

const {
  GET_REQUEST,
  GET_SUCCESS,
  GET_FAILURE,
  START_REQUEST,
  START_SUCCESS,
  START_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
} = actions;

function* get({ payload }) {
  try {
    const response = yield call(api.post, '/setting/all', payload);
    yield put({
      type: GET_SUCCESS,
      payload: {
        settings: response.data,
      }
    });
  } catch (error) {
    yield put({
      type: GET_FAILURE,
      payload: { error }
    });
  }
}

function* start({ payload }) {
  try {
    const response = yield call(api.post, '/setting/start', payload);
    yield put({
      type: START_SUCCESS,
      payload: {
        setting: response.data,
      }
    });
  } catch (error) {
    yield put({
      type: START_FAILURE,
      payload: { error }
    });
  }
}

function* update({ payload }) {
  try {
    const response = yield call(api.post, '/setting/update', payload);
    yield put({
      type: UPDATE_SUCCESS,
      payload: {
        setting: response.data,
      }
    });
  } catch (error) {
    yield put({
      type: UPDATE_FAILURE,
      payload: { error }
    });
  }
}

function* watchGet() {
  yield takeEvery(GET_REQUEST, get)
}

function* watchStart() {
  yield takeEvery(START_REQUEST, start)
}

function* watchUpdate() {
  yield takeEvery(UPDATE_REQUEST, update)
}

function* settingSaga() {
  yield all([
    fork(watchGet),
    fork(watchStart),
    fork(watchUpdate),
  ]);
}

export default settingSaga;