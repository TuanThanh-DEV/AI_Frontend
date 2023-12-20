import {
    LOAD_UPDATING_PRESCRIPTIONREVIEW
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PRESCRIPTIONREVIEW: {
            return {
                ...state,
                updatingPrescriptionReview: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};