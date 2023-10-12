// @flow
import { combineReducers } from 'redux';

import Queryform from './queryform/reducers';
import Auth from './auth/reducers';
import Layout from './layout/reducers';

export default (combineReducers({
  Queryform,
    Auth,
    Layout,
}): any);
