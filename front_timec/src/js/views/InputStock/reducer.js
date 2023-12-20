import {
    LOAD_UPDATING_INPUT_STOCK,
    LOAD_UPDATING_INPUT_FORM_1 
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_INPUT_STOCK: {
            return {
                ...state,
                updatingInputStock: action.payload.error ? null : action.payload.resultData
            };
        };
        case LOAD_UPDATING_INPUT_FORM_1: {
            return {
                ...state,
                updatingInputForm: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};