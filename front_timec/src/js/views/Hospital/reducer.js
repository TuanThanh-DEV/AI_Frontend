import {
    LOAD_UPDATING_HOSPITAL
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_HOSPITAL: {
            return {
                ...state,
                updatingHospital: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};