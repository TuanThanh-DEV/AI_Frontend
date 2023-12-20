import {
    LOAD_UPDATING_USER_ATTENDANCE, LOAD_USER_DTO
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_USER_ATTENDANCE: {
            return {
                ...state,
                updatingUserAttendance: action.payload.error ? null : action.payload.resultData
            };
        };
        case LOAD_USER_DTO: {
            return {
                ...state,
                updatingUserAttendance: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};