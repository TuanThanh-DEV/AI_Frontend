import {
    LOAD_UPDATING_MYCASHDESK
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_MYCASHDESK: {
            return {
                ...state,
                updatingMyCashDesk: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};