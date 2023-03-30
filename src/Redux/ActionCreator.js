import { SUBMIT } from './ActionTypes'

export const onSubmit = (input) => {
    return {
        type: SUBMIT,
        payload: input
    }
}