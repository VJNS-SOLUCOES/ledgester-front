import api from './api';
import { LoginDto, DefaultResponseDto, UserDto, CreateUserDto } from '../types';

export const authRequest = async (credentials: LoginDto): Promise<DefaultResponseDto<UserDto>> => {
  const { data } = await api.post('/Login/WebApi/Auth', {
    email: credentials.email,
    senha: credentials.password,
  });

  return data;
};

export const createUserRequest = async (
  userData: CreateUserDto,
): Promise<DefaultResponseDto<void>> => {
  const { data } = await api.post('/CadastroUsuario/WebApi/Create', userData);

  return data;
};
