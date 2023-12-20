import {
    LOAD_UPDATING_DRUG_CABINET
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_DRUG_CABINET: {
            return {
                ...state,
                updatingDrugCabinet: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};