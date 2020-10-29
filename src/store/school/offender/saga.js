import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import actions from './actions';
import api from 'api';

const {
  LIST_REQUEST,
  LIST_FAILURE,
  LIST_SUCCESS
} = actions;

function* list({ payload }) {
  try {
    const response = yield call(api.post, '/offender/list', payload);
    yield put({
      type: LIST_SUCCESS,
      payload: {
        offenders: response.data.items,
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
export function* watchList() {
  yield takeEvery(LIST_REQUEST, list)
}

function* offenderSaga() {
  yield all([
    fork(watchList),
  ]);
}

export default offenderSaga;