import axios, { InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

instance.defaults.headers.post = {
  crossOriginIsolated: false,
};

instance.defaults.headers.get = {
  crossOriginIsolated: false,
};

instance.interceptors.request.use(async config => {
  const user = JSON.parse(localStorage.getItem('user')!);

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${user?.token}`,
      // 'Access-Control-Allow-Origin': '*',
    },
  } as InternalAxiosRequestConfig<any>;
});

export default instance;
