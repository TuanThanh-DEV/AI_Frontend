import {
    LOAD_UPDATING_UOM
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_UOM: {
            return {
                ...state,
                updatingUom: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};