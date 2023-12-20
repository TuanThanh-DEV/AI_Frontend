import {
    LOAD_UPDATING_MEDICALSUPPIES
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_MEDICALSUPPIES: {
            return {
                ...state,
                updatingMedicalSupplies: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};