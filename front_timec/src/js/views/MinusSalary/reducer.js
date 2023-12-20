import {
    LOAD_UPDATING_MINUS_SALARY
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_MINUS_SALARY: {
            return {
                ...state,
                updatingMinusSalary: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};