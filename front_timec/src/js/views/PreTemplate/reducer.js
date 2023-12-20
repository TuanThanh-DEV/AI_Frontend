import {
    LOAD_UPDATING_PRETEMPLATE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PRETEMPLATE: {
            return {
                ...state,
                updatingPreTemplate: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};