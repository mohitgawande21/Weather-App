import { SUBMIT } from './ActionTypes'
import { TOGGLE_VALUE } from './ActionTypes'

export const onSubmit = (input) => {
    return {
        type: SUBMIT,
        payload: input
    }
}

export const onToggle = (val) => {
    return {
        type: TOGGLE_VALUE,
        payload: val
    }
}