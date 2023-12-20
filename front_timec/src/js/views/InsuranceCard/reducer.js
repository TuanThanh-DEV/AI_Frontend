import {
    LOAD_UPDATING_INSURANCE_CARD
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_INSURANCE_CARD: {
            return {
                ...state,
                updatingInsuranceCard: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};