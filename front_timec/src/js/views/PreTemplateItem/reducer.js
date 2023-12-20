import {
    LOAD_UPDATING_PRETEMPLATEITEM
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_PRETEMPLATEITEM: {
            return {
                ...state,
                updatingPreTemplateItem: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};