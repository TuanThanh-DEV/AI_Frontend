import {
    LOAD_UPDATING_DRUGSTORE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_DRUGSTORE: {
            return {
                ...state,
                updatingDrugStore: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};