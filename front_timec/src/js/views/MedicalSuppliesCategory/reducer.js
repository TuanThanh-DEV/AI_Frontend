import {
    LOAD_UPDATING_MEDICALSUPPIESCATEGORY
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_MEDICALSUPPIESCATEGORY: {
            return {
                ...state,
                updatingMedicalSuppliesCategory: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};