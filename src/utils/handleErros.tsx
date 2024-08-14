import { AxiosError } from 'axios';
import { ErrorDTO } from '../types';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export const handleErros = (error: any) => {
  const { logout } = useAuth();

  if (error instanceof AxiosError) {
    const errors: ErrorDTO = error.response?.data.errors;
    if (error.response === undefined) {
      toast.error('Algo deu errado!');
    } else if (errors.message !== '') {
      toast.error(errors.message);
      if (error.response.status === 401) logout();
    } else {
      toast.warning(errors.stackTrace);
    }
  }
};
