import {
    LOAD_UPDATING_USER_SALARY
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_USER_SALARY: {
            return {
                ...state,
                updatingUserSalary: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};