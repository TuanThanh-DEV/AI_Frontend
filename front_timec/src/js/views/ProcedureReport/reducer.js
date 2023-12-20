import {
    LOAD_UPDATING_PROCEDUREREPORT
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PROCEDUREREPORT: {
            return {
                ...state,
                updatingProcedureReport: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};