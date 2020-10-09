// @flow

import { takeLatest, all } from 'redux-saga/effects';

/* ------------- Services ---------- */

import { LoginService, UserService } from '../Services';

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux';
import { UserTypes } from '../Redux/UserRedux';

/* ------------- Sagas ------------- */

import { authenticate } from './LoginSagas';
import { getUsers } from './UserSagas';

/* ------------- API --------------- */

const loginService = LoginService.create();
const userService = UserService.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root(): Generator<*, *, *> {
  yield all([
    takeLatest(LoginTypes.LOGIN_REQUEST, authenticate, loginService),
    takeLatest(UserTypes.GET_USERS_REQUEST, getUsers, userService),
  ]);
}
