import { combineReducers } from 'redux';
import mlApps from './mlApps';
import modal from './modal';
import warnings from './warnings';
import currentMlAppId from './currentMlAppId';
import statuses from './statuses';


const sqwakApp = combineReducers({
  currentMlAppId,
  warnings,
  mlApps,
  statuses,
  modal
});

export default sqwakApp