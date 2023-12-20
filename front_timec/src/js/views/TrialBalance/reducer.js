import {
    LOAD_UPDATING_TRIAL_BALANCE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_TRIAL_BALANCE: {
            return {
                ...state,
                updatingTrialBalance: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};