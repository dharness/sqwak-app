import * as api from './../services/api';


export const loadPremadeClasses = () => {
  return (dispatch) => {
    dispatch({ type: 'LOAD_PREMADE_CLASSES_PENDING' });
    api.fetchPremadeClasses().then(premadeClasses => {
      premadeClasses = premadeClasses.map(premadeClass => {
        const formattedPremadeClass = {
          className: premadeClass.class_name,
          createdAt: premadeClass.created_at,
          updatedAt: premadeClass.updated_at,
          id: premadeClass.id,
          isEdited: premadeClass.is_edited,
          packageName: premadeClass.package_name,
          inModel: premadeClass.in_model,
          numSamples: premadeClass.audio_samples.length,
        };
        return formattedPremadeClass;
      })
      dispatch({
        type: 'SET_PREMADE_CLASSES',
        premadeClasses
      });
      dispatch({ type: 'LOAD_PREMADE_CLASSES_SUCCESS' });
    });
  }
};