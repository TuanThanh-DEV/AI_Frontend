import {
    LOAD_UPDATING_DRUG
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_DRUG: {
            return {
                ...state,
                updatingDrug: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};