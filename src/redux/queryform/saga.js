// @flow
import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { queryform as queryformApi} from '../../helpers/';
import { queryformApiResponseSuccess,queryformApiResponseError } from './actions';
import { QueryFormActionTypes } from './constants';


function* queryform({ payload: { datos} }) {
    try {
        const response = yield call(queryformApi, {datos});
        const query = response.data;
        yield put(queryformApiResponseSuccess(QueryFormActionTypes.QUERY_FORM, query));
    } catch (error) {
        yield put(queryformApiResponseError(QueryFormActionTypes.QUERY_FORM, error));
    }
  }

  export function* watchQueryForm(): any {
    yield takeEvery(QueryFormActionTypes.QUERY_FORM, queryform);
}

function* queryformSaga(): any {
    yield all([
        fork(watchQueryForm),
    ]);
}

export default queryformSaga;
