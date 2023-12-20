import {
    LOAD_UPDATING_DASHBOARD
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_DASHBOARD: {
            return {
                ...state,
                updatingDashboard: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};