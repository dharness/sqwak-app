import { createSelector } from 'reselect'


const mlAppsList = state => state.mlApps;
const currentMlAppId = state => state.currentMlAppId;

const getCustomMlClasses = (mlAppsList, currentMlAppId) => {
  let currentMlApp = mlAppsList[currentMlAppId];
  let customMlClasses = [];

  if (currentMlApp && currentMlApp.mlClasses) {
    customMlClasses = currentMlApp.mlClasses.filter(mlClass => !mlClass.inModel);
  }
  return customMlClasses;
};

export default createSelector(
  mlAppsList,
  currentMlAppId,
  getCustomMlClasses
);