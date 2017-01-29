import { combineReducers } from 'redux';
import userApps from './userApps';
import modal from './modal';


const sqwakApp = combineReducers({
  userApps,
  modal
})

export default sqwakApp