import { DefaultResponseDto, GroupProfileTableDTO, GroupProfileTableRequestDTO } from '../types';
import api from './api';

export const GroupProfileRequest = async (
  groupProfileParams: GroupProfileTableRequestDTO,
): Promise<DefaultResponseDto<GroupProfileTableDTO[]>> => {
  const { data } = await api.post('/CadastroPerfilDeGrupo/WebApi/MontaTela', {
    grupoUsuarioId: groupProfileParams.GrupoUsuarioId,
    tabTipoFuncaoId: groupProfileParams.TabTipoFuncaoId,
  });

  return data;
};
