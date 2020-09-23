import { all } from 'redux-saga/effects';
import offenderSagas from './offender/saga';
import memberSagas from './member/saga';
import vehicleSagas from './vehicle/saga';
import settingSagas from './setting/saga';

export default function* rootSaga(getState) {
  yield all([
    offenderSagas(),
    memberSagas(),
    vehicleSagas(),
    settingSagas(),
  ]);
}
