import {
    LOAD_UPDATING_DASHBOARDNOTIFICATION
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_DASHBOARDNOTIFICATION: {
            return {
                ...state,
                updatingDashboardNotification: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};