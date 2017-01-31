import { createSelector } from 'reselect'


const mlAppsList = state => state.userApps;
const currentMlAppId = state => state.currentMlAppId;

const getCurrentApp = (mlAppsList, currentMlAppId) => {
  return mlAppsList[0];
};

export default createSelector(
  mlAppsList,
  currentMlAppId,
  getCurrentApp
);