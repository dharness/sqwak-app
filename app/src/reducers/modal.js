const modal = (state = {}, action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            return Object.assign({}, state, {
                component: action.component
            })
        case 'CLOSE_MODAL':
            return {}
        default:
            return state
    }
}

export default modal