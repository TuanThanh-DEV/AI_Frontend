import {
    LOAD_UPDATING_QUEUE_NUMBER
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_QUEUE_NUMBER: {
            return {
                ...state,
                updatingQueueNumber: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};