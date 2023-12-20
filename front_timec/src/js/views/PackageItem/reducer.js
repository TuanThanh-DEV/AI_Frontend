import {
    LOAD_UPDATING_PACKAGEITEM
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PACKAGEITEM: {
            return {
                ...state,
                updatingPackageItem: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};