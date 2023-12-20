import {
    LOAD_UPDATING_DEVICEMAINTENCANCE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_DEVICEMAINTENCANCE: {
            return {
                ...state,
                updatingDeviceMaintenance: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};