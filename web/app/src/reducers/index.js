import { combineReducers } from 'redux';
import userApps from './userApps';
import modal from './modal';
import mlClasses from './mlClasses';
import currentMlAppId from './currentMlAppId';


const sqwakApp = combineReducers({
  mlClasses,
  currentMlAppId,
  userApps,
  modal
});

export default sqwakApp