import {
    LOAD_UPDATING_ACCOUNT_CODE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_ACCOUNT_CODE: {
            return {
                ...state,
                updatingAccountCode: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};