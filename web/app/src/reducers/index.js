import { combineReducers } from 'redux';
import mlApps from './mlApps';
import modal from './modal';
import currentMlAppId from './currentMlAppId';
import statuses from './statuses';


const sqwakApp = combineReducers({
  currentMlAppId,
  mlApps,
  statuses,
  modal
});

export default sqwakApp