import AppConfig from '../Config/AppConfig';

export const createApiHeaders = (accessToken) => {
  if (accessToken) {
    return {
      'x-api-key': AppConfig.apiKey,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return {
    'x-api-key': AppConfig.apiKey,
  };
};

export const apiResolveError = ({ statusCode, serviceResponse }) => {
  let data = null;
  if (serviceResponse) {
    data = serviceResponse.data || serviceResponse.problem;
  }

  if (statusCode && data) {
    switch (true) {
      case statusCode === 400:
        return 'badRequestError';
      case statusCode === 401:
        return 'unauthorizedError';
      case statusCode > 401 && statusCode < 500:
        return 'clientError';
      case statusCode > 499:
        return 'serverError';
      default:
        return 'clientError';
    }
  } else if (statusCode === null && !data) {
    return 'dataError';
  } else {
    return 'apiTimeoutError';
  }
};
