import { combineReducers } from 'redux';
import Auth from './auth/reducer';
import Layout from './layout/reducer';
import School from './school/reducer';

export default combineReducers({
  Auth,
  Layout,
  School
});
