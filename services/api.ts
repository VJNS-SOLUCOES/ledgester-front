import axios from 'axios';
import type { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

api.interceptors.request.use(
  (request: any) => {
    return {
      ...request,
      headers: {
        ...request.headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

export default api;
