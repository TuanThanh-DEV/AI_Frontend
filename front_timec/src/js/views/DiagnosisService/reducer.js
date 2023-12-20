import {
    LOAD_UPDATING_DIAGNOSISSERVICE
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_DIAGNOSISSERVICE: {
            return {
                ...state,
                updatingDiagnosisService: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};