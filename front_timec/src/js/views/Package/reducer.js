import {
    LOAD_UPDATING_PACKAGE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PACKAGE: {
            return {
                ...state,
                updatingPackage: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};