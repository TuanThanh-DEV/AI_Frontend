import {
    LOAD_UPDATING_QUEUE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_QUEUE: {
            return {
                ...state,
                updatingQueue: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};