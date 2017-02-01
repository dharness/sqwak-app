import { createSelector } from 'reselect'


const mlAppsList = state => state.mlApps;
const currentMlAppId = state => state.currentMlAppId;

const getCurrentApp = (mlAppsList, currentMlAppId) => {
  return mlAppsList[currentMlAppId];
};

export default createSelector(
  mlAppsList,
  currentMlAppId,
  getCurrentApp
);