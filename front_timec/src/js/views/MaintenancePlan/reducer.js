import {
    LOAD_UPDATING_MAINTENANCEPLAN
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_MAINTENANCEPLAN: {
            return {
                ...state,
                updatingMaintenancePlan: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};