import apisauce from 'apisauce';
import AppConfig from '../Config/AppConfig';

const loginUrl = 'login';

const create = (baseURL = AppConfig.baseApiURL) => {
  const login = (action, headers) => {
    const api = apisauce.create({
      baseURL,
      timeout: AppConfig.requestTimeout,
      headers,
    });

    const { params } = action;

    const { username, password } = params;

    const requestBody = {
      username,
      password,
    };
    return api.post(loginUrl, requestBody);
  };

  return {
    login,
  };
};

export default {
  create,
};
