import { combineReducers } from 'redux';
import mlApps from './mlApps';
import modal from './modal';
import warnings from './warnings';
import currentMlAppId from './currentMlAppId';
import statuses from './statuses';
import premadeClasses from './premadeClasses';
import user from './user';


const sqwakApp = combineReducers({
  currentMlAppId,
  warnings,
  mlApps,
  statuses,
  premadeClasses,
  modal,
  user
});

export default sqwakApp