import api from './api';
import { LoginDto, UserDto } from '../types';

export const authRequest = async (credentials: LoginDto): Promise<UserDto> => {
  const { data } = await api.post('/Login/WebApi/Auth', {
    email: credentials.email,
    senha: credentials.password,
  });

  return data;
};
