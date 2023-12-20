import {
    LOAD_UPDATING_CONFIG_WARNING_DRUG
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_CONFIG_WARNING_DRUG: {
            return {
                ...state,
                updatingConfigWarningDrug: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};