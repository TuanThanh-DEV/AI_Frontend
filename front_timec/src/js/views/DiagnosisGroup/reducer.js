import {
    LOAD_UPDATING_DIAGNOSISGROUP
} from './action-types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_UPDATING_DIAGNOSISGROUP: {
            return {
                ...state,
                updatingDiagnosisGroup: action.payload.error ? null : action.payload.resultData
            };
        };
        default:
            return state;
    }
    
};