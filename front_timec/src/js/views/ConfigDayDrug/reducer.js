import {
    LOAD_UPDATING_CONFIG_DAY_DRUG
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_CONFIG_DAY_DRUG: {
            return {
                ...state,
                updatingConfigDayDrug: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};