import {
    LOAD_UPDATING_INSURANCEINVOICEITEM
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_INSURANCEINVOICEITEM: {
            return {
                ...state,
                updatingInsuranceInvoiceItem: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};