import {
    LOAD_UPDATING_PRESCRIPTIONFORMITEM
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PRESCRIPTIONFORMITEM: {
            return {
                ...state,
                updatingPrescriptionFormItem: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};