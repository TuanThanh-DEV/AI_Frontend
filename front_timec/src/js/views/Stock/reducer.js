import {
    LOAD_UPDATING_STOCK
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_STOCK: {
            return {
                ...state,
                updatingStock: action.payload.error ? null : action.payload.resultData
            };
        };
        
        default:
            return state;
    }
    
};