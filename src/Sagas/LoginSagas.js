import { put, call } from 'redux-saga/effects';
import LoginActions from '../Redux/LoginRedux';
import { ApiUtils } from '../Lib';

export function* authenticate(loginService, action) {
  try {
    const loginResponse = yield call(
      loginService.login,
      action,
      ApiUtils.createApiHeaders(),
    );
    if (!loginResponse.ok) {
      if (loginResponse.data) {
        const errorMessage = ApiUtils.apiResolveError({
          statusCode: loginResponse.status,
          serviceResponse: loginResponse,
        });
        yield put(LoginActions.loginFailure(errorMessage));
      } else {
        yield put(
          LoginActions.loginFailure(
            ApiUtils.apiResolveError({
              statusCode: loginResponse.status,
              serviceResponse: loginResponse,
            }),
          ),
        );
      }
      return;
    }

    yield put(
      LoginActions.storeUserDetails(
        loginResponse.data.data.name,
        loginResponse.data.data.username,
        loginResponse.data.data.token,
      ),
    );
  } catch (err) {
    yield put(
      LoginActions.loginFailure(
        ApiUtils.apiResolveError({
          statusCode: null,
          serviceResponse: null,
        }),
      ),
    );
  }
}

export function* logout(loginService) {
  // yield* returnToLoginScreen();
}
