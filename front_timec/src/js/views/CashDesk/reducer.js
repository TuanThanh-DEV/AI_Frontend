import {
    LOAD_UPDATING_CASHDESK
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_CASHDESK: {
            return {
                ...state,
                updatingCashDesk: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};