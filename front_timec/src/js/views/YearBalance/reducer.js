import {
    LOAD_UPDATING_YEAR_BALANCE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_YEAR_BALANCE: {
            return {
                ...state,
                updatingYearBalance: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};