import {
    LOAD_UPDATING_PRESCRIPTIONITEM
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PRESCRIPTIONITEM: {
            return {
                ...state,
                updatingPrescriptionItem: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};