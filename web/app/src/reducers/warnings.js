const warnings = (state = [], action) => {
    switch (action.type) {
        case 'CLOSE_WARNING':
            return [
                ...state.slice(0, action.warningId), 
                ...state.slice(action.warningId + 1)
            ];

        case 'SHOW_WARNING':
            return state.concat([action.warning])
        default:
            return state;
    }
}

export default warnings