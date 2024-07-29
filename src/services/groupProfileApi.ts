import {
  DefaultResponseDto,
  FuntionGroup_TypeDTO,
  GroupProfileConfigurationDTO,
  GroupProfileTableDTO,
  GroupProfileTableRequestDTO,
} from '../types';
import api from './api';

export const groupProfileRequest = async (
  groupProfileParams: GroupProfileTableRequestDTO,
): Promise<DefaultResponseDto<GroupProfileTableDTO[]>> => {
  const { data } = await api.get('/CadastroPerfilDeGrupo/WebApi/MontaTela', {
    params: {
      grupoUsuarioId: groupProfileParams.grupoUsuarioId,
      tabTipofuncao_Id: groupProfileParams.tabTipofuncao_Id,
    },
  });

  return data;
};

export const updateProfileGroupRequest = async (
  inputData: GroupProfileConfigurationDTO[],
): Promise<void> => {
  const { data } = await api.post('/CadastroPerfilDeGrupo/WebApi/Gravar', inputData);

  return data;
};

export const funtionGroupsRequest = async (): Promise<
  DefaultResponseDto<FuntionGroup_TypeDTO[]>
> => {
  const { data } = await api.get('/CadastroPerfilDeGrupo/WebApi/GrupoFuncao');

  return data;
};

export const funtionTypesRequest = async (): Promise<
  DefaultResponseDto<FuntionGroup_TypeDTO[]>
> => {
  const { data } = await api.get('/CadastroPerfilDeGrupo/WebApi/TipoFuncao');

  return data;
};
