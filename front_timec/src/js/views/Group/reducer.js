import {
    LOAD_UPDATING_GROUP
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_GROUP: {
            return {
                ...state,
                updatingGroup: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};