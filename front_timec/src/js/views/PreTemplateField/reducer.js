import {
    LOAD_UPDATING_PRETEMPLATEFIELD
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PRETEMPLATEFIELD: {
            return {
                ...state,
                updatingPreTemplateField: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};