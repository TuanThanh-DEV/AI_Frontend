import {
    LOAD_UPDATING_PATIENT
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PATIENT: {
            return {
                ...state,
                updatingPatient: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};