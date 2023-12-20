import {
    LOAD_UPDATING_PROCEDURESERVICE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PROCEDURESERVICE: {
            return {
                ...state,
                updatingProcedureService: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};