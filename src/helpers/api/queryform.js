// @flow
import { APICore } from './apiCore';

const api = new APICore();


function queryform(params: any): any {
    const baseUrl = '/queryform/';
    return api.create(`${baseUrl}`, params);
}



export { queryform};
