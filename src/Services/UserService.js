//@flow

import apisauce from 'apisauce';
import AppConfig from '../Config/AppConfig';

const create = (baseURL = AppConfig.baseApiURL) => {
  const getUsers = (action, headers) => {
    const api = apisauce.create({
      headers,
      baseURL,
      timeout: AppConfig.requestTimeout,
    });

    return api.get('users');
  };

  return {
    getUsers,
  };
};

export default {
  create,
};
