import {
    LOAD_UPDATING_DIAGNOSISREPORT
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_DIAGNOSISREPORT: {
            return {
                ...state,
                updatingDiagnosisReport: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};