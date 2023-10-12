// @flow
import { QueryFormActionTypes } from './constants';

const INIT_STATE = {
    datos: {},
    loading: false,
};

type QueryformAction = { type: string, payload: { actionType?: string, data?: any, error?: string } };
type State = { datos?: {} | null, loading?: boolean, +value?: boolean };

const Queryform = (state: State = INIT_STATE, action: QueryformAction): any => {

    switch (action.type) {
        case QueryFormActionTypes.API_RESPONSE_SUCCESS:
            switch (action.payload.actionType) {
                case QueryFormActionTypes.QUERY_FORM: {
                    return {
                        ...state,
                        loading: false,
                        queryForm: true,
                    };
                }
                default:
                    return { ...state };
            }

        case QueryFormActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case QueryFormActionTypes.QUERY_FORM: {
                    return {
                        ...state,
                        registerError: action.payload.error,
                        queryForm: false,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }
        case QueryFormActionTypes.QUERY_FORM:
            return { ...state, loading: true, queryForm: false };
        case QueryFormActionTypes.RESET:
            return {
                ...state,
                loading: false,
                error: false,
                queryForm: false,
            };
        default:
            return { ...state };
    }
};

export default Queryform;
