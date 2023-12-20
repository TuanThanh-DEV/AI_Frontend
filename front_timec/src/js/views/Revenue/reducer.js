import {
    LOAD_UPDATING_REVENUE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_REVENUE: {
            return {
                ...state,
                updatingRevenue: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};