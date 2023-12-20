import {
    LOAD_UPDATING_PRESCRIPTIONFORM
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PRESCRIPTIONFORM: {
            return {
                ...state,
                updatingPrescriptionForm: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};