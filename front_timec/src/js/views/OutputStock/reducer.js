import {
    LOAD_UPDATING_OUTPUT_STOCK
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        
        case LOAD_UPDATING_OUTPUT_STOCK: {
            return {
                ...state,
                updatingOutputStock: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};