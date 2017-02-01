import { combineReducers } from 'redux';
import userApps from './userApps';
import modal from './modal';
import warnings from './warnings';
import mlClasses from './mlClasses';
import currentMlAppId from './currentMlAppId';


const sqwakApp = combineReducers({
  mlClasses,
  currentMlAppId,
  userApps,
  modal,
  warnings
});

export default sqwakApp