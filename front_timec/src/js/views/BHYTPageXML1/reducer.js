import {
    LOAD_UPDATING_BILLING
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_BILLING: {
            return {
                ...state,
                updatingBilling: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};