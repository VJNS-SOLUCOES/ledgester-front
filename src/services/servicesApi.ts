import { DefaultResponseDto, GroupProfileDTO } from '../types';
import api from './api';

export const serviceRequest = async (
  functionId: number,
): Promise<DefaultResponseDto<GroupProfileDTO>> => {
  const { data } = await api.get('/Servicos/WebApi/GetPermission', {
    params: {
      funcaoId: functionId,
    },
  });

  return data;
};
