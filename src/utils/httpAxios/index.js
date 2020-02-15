import axios from 'axios';
import _ from 'lodash';
// import runtimeEnv from '../../runtimeEnv';
import { compose, formlize } from '../helper';
import getInterceptors from './interceptors';

// const {  } = runtimeEnv;

const axiosInstance = axios.create({
  withCredentials: true,
  timeout: 10000, // 客户端超时时间，若请求超过这个时间会根据配置的超时重试次数和超时重试间隔尝试重新请求
  retry: 5, // 客户端超时重试次数
  retryDelay: 1000 // 客户端超时重试间隔
});

// const { requestPrev, responsePrev, responseError } = getInterceptors(axiosInstance, {
// //   ...runtimeEnv
// });

// const requestPrevInterceptor = compose(...requestPrev);
// const responsePrevInterceptor = compose(...responsePrev);
// const responseErrorInterceptor = compose(...responseError);

// axiosInstance.interceptors.request.use(requestPrevInterceptor);
// axiosInstance.interceptors.response.use(responsePrevInterceptor, responseErrorInterceptor);

const addXVersion = url => {
  let reqUrl = url;
//   if (!_.isEmpty(_XVersion_)) {
//     if (url.indexOf('?') === -1) {
//       reqUrl = `${url}?x-version=${_XVersion_}`;
//     } else {
//       reqUrl = `${url}&x-version=${_XVersion_}`;
//     }
//   }
  return reqUrl;
};

export const postForm = (url, data, cfg = {}) => {
  return axiosInstance.post(addXVersion(url), data, {
    transformRequest: formlize,
    ...cfg
  });
};

export const postJson = (url, data, cfg = {}) => {
  return axiosInstance.post(addXVersion(url), data, {
    ...cfg
  });
};

export const pull = (url, params, cfg = {}) => {
  return axiosInstance.get(addXVersion(url), {
    params,
    ...cfg
  });
};

export default axiosInstance;
