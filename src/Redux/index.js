// @flow

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as loginReducer } from './LoginRedux';
import { reducer as userReducer } from './UserRedux';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    login: loginReducer,
    user: userReducer,
  });

export default rootReducer;
