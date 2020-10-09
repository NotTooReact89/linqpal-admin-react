// @flow

import { call, put } from 'redux-saga/effects';
import apiCall from './APISaga';
import UserActions from '../Redux/UserRedux';
import { ApiUtils } from '../Lib';
import { toUsers } from '../Transforms';

export function* getUsers(userService) {
  try {
    const usersResponse = yield call(apiCall, userService.getUsers, {});

    if (usersResponse.ok && usersResponse.data) {
      yield put(UserActions.getUsersSuccess(toUsers(usersResponse.data.data)));
    } else {
      yield put(
        UserActions.getUsersFailure(
          ApiUtils.apiResolveError({
            statusCode: usersResponse.status,
            serviceResponse: usersResponse,
          }),
        ),
      );
    }
  } catch (err) {
    yield put(
      UserActions.getUsersFailure(
        ApiUtils.apiResolveError({
          statusCode: null,
          serviceResponse: null,
        }),
      ),
    );
  }
}
