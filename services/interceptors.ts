import api from './api';

export default function interceptors(): void {
  api.interceptors.request.use(
    (request: any) => {
      return request;
    },
    (error: any) => {
      return Promise.reject(error);
    },
  );
  api.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (error: any) => {
      return Promise.reject(error);
    },
  );
}
