import { combineReducers } from 'redux';
import userApps from './userApps';
import modal from './modal';
import mlClasses from './mlClasses';


const sqwakApp = combineReducers({
  mlClasses,
  userApps,
  modal
});

export default sqwakApp