import {
    LOAD_UPDATING_OUTPUT_FORM
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_OUTPUT_FORM: {
            return {
                ...state,
                updatingOutputForm: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};