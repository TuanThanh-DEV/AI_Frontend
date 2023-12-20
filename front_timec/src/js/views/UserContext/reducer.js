import {
    LOAD_UPDATING_USERCONTEXT
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_USERCONTEXT: {
            return {
                ...state,
                updatingUserContext: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};