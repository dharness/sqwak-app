import { createSelector } from 'reselect'


const mlAppsList = state => state.mlApps;
const currentMlAppId = state => state.currentMlAppId;

const getMlModel = (mlAppsList, currentMlAppId) => {
  let currentMlApp = mlAppsList[currentMlAppId];
  let mlModel = {mlClasses: []};

  if (currentMlApp && currentMlApp.mlClasses) {
    mlModel.mlClasses = currentMlApp.mlClasses.filter(mlClass => mlClass.inModel);
  }
  return mlModel;
};

export default createSelector(
  mlAppsList,
  currentMlAppId,
  getMlModel
);