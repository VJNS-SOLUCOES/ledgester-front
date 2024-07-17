import { DefaultResponseDto, GroupProfileTableDTO, GroupProfileTableRequestDTO } from '../types';
import api from './api';

export const GroupProfileRequest = async (
  groupProfileParams: GroupProfileTableRequestDTO,
): Promise<DefaultResponseDto<GroupProfileTableDTO[]>> => {
  const { data } = await api.get('/CadastroPerfilDeGrupo/WebApi/MontaTela', {
    params: {
      grupoUsuarioId: groupProfileParams.GrupoUsuarioId,
      tabTipoFuncaoId: groupProfileParams.TabTipoFuncaoId,
    },
  });

  return data;
};
