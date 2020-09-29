import { combineReducers } from 'redux';
import Offender from './offender/reducer';
import Member from './member/reducer';
import Vehicle from './vehicle/reducer';
import Setting from './setting/reducer';
import Record from './record/reducer';
import Alert from './alert/reducer';

export default combineReducers({
  Offender,
  Member,
  Vehicle,
  Setting,
  Record,
  Alert
});
