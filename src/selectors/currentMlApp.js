import { createSelector } from 'reselect'


const mlAppsList = state => state.mlApps;
const currentMlAppId = state => state.currentMlAppId;

const getCurrentApp = (mlAppsList, currentMlAppId) => {
  let currentMlApp = mlAppsList[currentMlAppId];
  if (!currentMlApp) {
      currentMlApp = {
          appName: "loading...",
          mlClasses: [],
          mlModel: {
              mlClasses: []
          }
      }
  } 
  return currentMlApp;
};

export default createSelector(
  mlAppsList,
  currentMlAppId,
  getCurrentApp
);