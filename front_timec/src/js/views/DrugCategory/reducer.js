import {
    LOAD_UPDATING_DRUGCATEGORY
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_DRUGCATEGORY: {
            return {
                ...state,
                updatingDrugCategory: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};