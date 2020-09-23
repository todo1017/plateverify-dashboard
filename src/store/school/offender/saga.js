import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import actions from './actions';
import api from 'containers/api';

const {
  LIST_REQUEST,
  LIST_FAILURE,
  LIST_SUCCESS
} = actions;

function* offenderList({ payload }) {
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
export function* watchOffenderList() {
  yield takeEvery(LIST_REQUEST, offenderList)
}

function* offenderSaga() {
  yield all([
    fork(watchOffenderList),
  ]);
}

export default offenderSaga;