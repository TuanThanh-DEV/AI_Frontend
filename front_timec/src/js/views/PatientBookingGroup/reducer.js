import {
    LOAD_UPDATING_PATIENTBOOKINGGROUP
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PATIENTBOOKINGGROUP: {
            return {
                ...state,
                updatingPatientBookingGroup: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};