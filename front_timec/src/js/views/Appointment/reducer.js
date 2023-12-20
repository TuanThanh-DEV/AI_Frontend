import {
    LOAD_UPDATING_APPOINTMENT
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_APPOINTMENT: {
            return {
                ...state,
                updatingAppointment: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};