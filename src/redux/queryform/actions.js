// @flow
import { QueryFormActionTypes } from './constants';

type QueryformAction = { type: string, payload: {} | string };

// common success
export const queryformApiResponseSuccess = (actionType: string, data: any): QueryformAction => ({
    type:QueryFormActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const queryformApiResponseError = (actionType: string, error: string): QueryformAction => ({
    type: QueryFormActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

//REGISTRAR O ACTUALIZAR Empleado
export const queryFormSend= (datos:any): QueryformAction => ({
    type: QueryFormActionTypes.QUERY_FORM,
    payload: {datos},
});

export const resetForm  = (): QueryformAction => ({
    type: QueryFormActionTypes.RESET,
    payload: {},
});
