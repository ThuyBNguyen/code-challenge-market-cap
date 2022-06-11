import axios from 'axios';
import _isObject from 'lodash/isObject';
import _get from 'lodash/get';
import Helper from 'utils/helpers';

const getAxiosInstance = () => {
  const headers = {
    'x-access-token': process.env.COIN_RAKING_TOKEN,
    'Access-Control-Allow-Origin': '*',
  };

  const axiosInstance = axios.create({
    baseURL: process.env.COIN_RANKING_URL,
    headers,
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      if ([200, 201].includes(response.status)) {
        const result = response.data;
        if (_isObject(result.isObject)) {
          result.statusCode = response.status;
        }
        return response.data;
      }
      return Promise.reject(response);
    },
    (error) => {
      if (Helper.isServerSideRender() || window.navigator.onLine) {
        const code = _get(error.response, 'data.code', error.response.status);
        if (code) {
          return Promise.reject(error.response.data);
        }
        return Promise.reject(error.response.data);
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
          code: 500,
          data: 'noNetwork',
          error: 'noNetwork',
        });
      }
    },
  );

  return axiosInstance;
};

const request = (
  url: string,
  data = {},
  { method = 'POST' }: { method?: string; token?: string } = {},
): Promise<any> => {
  try {
    const API = getAxiosInstance();
    switch (method) {
      case 'GET':
        return API.get(url, { params: data });
      case 'PUT':
        return API.put(url, data);
      case 'DELETE':
        return API.delete(url, { params: data });
      default:
        return API.post(url, data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default request;
