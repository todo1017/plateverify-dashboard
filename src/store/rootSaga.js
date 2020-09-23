import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import schoolSagas from './school/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    schoolSagas()
  ]);
}
