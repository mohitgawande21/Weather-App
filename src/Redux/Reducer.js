import { SUBMIT} from './ActionTypes'

const initialState = {
    inputCity:''
}

export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT:
            return {
                ...state, inputCity: action.payload
            }
        default:
            return state;
    }
}
