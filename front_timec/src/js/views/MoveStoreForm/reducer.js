import {
    LOAD_UPDATING_MOVE_STORE_FORM
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_MOVE_STORE_FORM: {
            return {
                ...state,
                updatingInputForm: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};