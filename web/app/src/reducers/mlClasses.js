const mlClasses = (state = [], action) => {
  switch (action.type) {
    case 'RESET_ML_CLASS_LIST':
      return [];
    case 'ADD_ML_CLASS':
      return [...state, action.mlClass]
    case 'REMOVE_ML_CLASS':
      var i = state.findIndex(mlClass => mlClass._id === action.mlClassId);
      return [
        ...state.slice(0, i),
        ...state.slice(i + 1)
      ];
    default:
      return state;
  }
};

export default mlClasses