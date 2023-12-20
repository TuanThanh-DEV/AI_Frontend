import {
    LOAD_UPDATING_CONFIG_TABLE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_CONFIG_TABLE: {
            return {
                ...state,
                updatingConfigTable: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};