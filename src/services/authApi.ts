import api from './api';
import { LoginDto, DefaultResponseDto, UserDto } from '../types';

export const authRequest = async (credentials: LoginDto): Promise<DefaultResponseDto<UserDto>> => {
  const { data } = await api.post('/Login/WebApi/Auth', {
    email: credentials.email,
    senha: credentials.password,
  });

  return data;
};
