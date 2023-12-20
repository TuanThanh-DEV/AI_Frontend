import {
    LOAD_UPDATING_CASHWIDRAWAL
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_CASHWIDRAWAL: {
            return {
                ...state,
                updatingCashWidrawal: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};