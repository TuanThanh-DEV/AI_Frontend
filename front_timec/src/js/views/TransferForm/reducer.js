import {
    LOAD_UPDATING_TRANSFERFORM
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_TRANSFERFORM: {
            return {
                ...state,
                updatingTransferForm: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};