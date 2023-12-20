import {
    LOAD_UPDATING_INSURANCE_TYPE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_INSURANCE_TYPE: {
            return {
                ...state,
                updatingInsuranceType: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};