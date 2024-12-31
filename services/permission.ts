import type { DefaultResponseDto, ErrorDto, GroupProfileDTO } from '~/types';
import api from '~/services/api';
import { AxiosError } from 'axios';

export const serviceRequest = async (funcaoId: string) => {
  try {
    const { data: response } = await api.get<DefaultResponseDto<GroupProfileDTO>>(
      '/Servicos/WebApi/GetPermission',
      {
        params: {
          funcaoId,
        },
      },
    );

    if (!response.data.permissao.can_Search) {
      swalError({ title: 'Ops..', text: 'Permição negada!' });
      navigateTo('/');
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errors: ErrorDto = error.response?.data.errors;
      if (error.response === undefined) {
        swalError({ title: 'Ops..', text: 'Algo deu errado!' });
      } else if (errors.message !== '') {
        swalError({ title: 'Ops..', text: errors.message });
        if (error.response.status === 401) navigateTo('/');
      } else {
        swalWarning({ title: 'Falha', text: errors.stackTrace });
      }
    }
    navigateTo('/');
  }
};
