import {
    LOAD_UPDATING_DEVICE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_DEVICE: {
            return {
                ...state,
                updatingDevice: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};