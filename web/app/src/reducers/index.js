import { combineReducers } from 'redux';
import mlApps from './mlApps';
import modal from './modal';
import currentMlAppId from './currentMlAppId';


const sqwakApp = combineReducers({
  currentMlAppId,
  mlApps,
  modal
});

export default sqwakApp