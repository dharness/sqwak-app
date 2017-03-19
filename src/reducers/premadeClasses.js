const premadeClasses = (state = [], action) => {
  switch (action.type) {

    case 'SET_PREMADE_CLASSES': {
      return action.premadeClasses;
    }

    default:
      return state
  }
}

export default premadeClasses