import {
    LOAD_UPDATING_HELPCOMMENT
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_HELPCOMMENT: {
            return {
                ...state,
                updatingHelpComment: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};