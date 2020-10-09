// @flow

import { call, select } from 'redux-saga/effects';
import { getAccessToken } from '../Redux/LoginRedux';
import { ApiUtils } from '../Lib';

export default function* apiCall(serviceCall: *, ...args: *) {
  let accessToken = yield select((state) => getAccessToken(state));

  let serviceCallResponse = yield call(
    serviceCall,
    ...args,
    ApiUtils.createApiHeaders(accessToken),
  );
  if (serviceCallResponse.status) {
    if (hasSessionTimedOut(serviceCallResponse.status)) {
      yield* returnToLoginScreen();
    }
  }
  return serviceCallResponse;
}

export function* returnToLoginScreen() {}

const hasSessionTimedOut = (statusCode) => {
  if (statusCode === 401) {
    return true;
  }
  return false;
};
