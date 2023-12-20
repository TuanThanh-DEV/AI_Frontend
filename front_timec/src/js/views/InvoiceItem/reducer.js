import {
    LOAD_UPDATING_INVOICEITEM
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_INVOICEITEM: {
            return {
                ...state,
                updatingInvoiceItem: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};