// @flow
import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import queryformSaga from './queryform/saga';
import layoutSaga from './layout/saga';

export default function* rootSaga(): any {
    yield all([authSaga(),queryformSaga(), layoutSaga()]);
}
