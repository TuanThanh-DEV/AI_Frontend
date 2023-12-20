import {
    LOAD_UPDATING_HELPTICKET
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_HELPTICKET: {
            return {
                ...state,
                updatingHelpTicket: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};