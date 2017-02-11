import * as api from './../services/api';


export const loadPremadeClasses = () => {
  return (dispatch) => {
    api.fetchPremadeClasses().then(premadeClasses => {
      premadeClasses = premadeClasses.map(premadeClass => {
        const formattedPremadeClass = {
          className: premadeClass.class_name,
          createdAt: premadeClass.created_at,
          updatedAt: premadeClass.updated_at,
          id: premadeClass.id,
          isEdited: premadeClass.is_edited,
          packageName: premadeClass.package_name,
          inModel: premadeClass.in_model
        };
        return formattedPremadeClass;
      })
      dispatch({
        type: 'SET_PREMADE_CLASSES',
        premadeClasses
      })
    });
  }
};