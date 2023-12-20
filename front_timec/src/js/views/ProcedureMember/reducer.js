import {
    LOAD_UPDATING_PROCEDUREMEMBER
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PROCEDUREMEMBER: {
            return {
                ...state,
                updatingProcedureMember: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};