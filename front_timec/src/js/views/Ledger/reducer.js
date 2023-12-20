import {
    LOAD_UPDATING_LEDGER
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_LEDGER: {
            return {
                ...state,
                updatingLedger: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};