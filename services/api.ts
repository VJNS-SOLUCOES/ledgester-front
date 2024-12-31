import axios from 'axios';
import type { AxiosInstance } from 'axios';
const config = useRuntimeConfig();

const api: AxiosInstance = axios.create({
  baseURL: config.public.baseUrl,
});

api.interceptors.request.use(
  (request: any) => {
    const userData = JSON.parse(localStorage.getItem('@LEDGESTER/user-store') || '');
    return {
      ...request,
      headers: {
        ...request.headers,
        Authorization: `Bearer ${userData.token || ''}`,
      },
    };
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

export default api;
