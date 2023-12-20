import {
    LOAD_UPDATING_DAYREVENUE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_DAYREVENUE: {
            return {
                ...state,
                updatingDayRevenue: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};