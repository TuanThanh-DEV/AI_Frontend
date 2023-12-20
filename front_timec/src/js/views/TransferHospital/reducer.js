import {
    LOAD_UPDATING_TRANSFERHOSPITAL
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_TRANSFERHOSPITAL: {
            return {
                ...state,
                updatingTransferHospital: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};