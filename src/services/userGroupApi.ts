import { CreateUserGroupDto, DefaultResponseDto } from '../types';
import api from './api';

export const createUserGroupRequest = async (
  userGroupData: CreateUserGroupDto,
): Promise<DefaultResponseDto<void>> => {
  const { data } = await api.post('/CadastroGrupoUsuario/WebApi/Create', userGroupData);

  return data;
};
