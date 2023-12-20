import {
    LOAD_UPDATING_BOOKINGGROUP
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_BOOKINGGROUP: {
            return {
                ...state,
                updatingBookingGroup: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};