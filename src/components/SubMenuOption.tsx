import React from 'react';
import { ErrorDTO, FunctionChildrenDto } from '../types';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { handleIcons } from '../utils';
import { serviceRequest } from '../services';
import { useQuery, useQueryClient } from 'react-query';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

type Props = {
  mouseEnter: boolean;
  pathname: string;
  functionsOptions: FunctionChildrenDto;
  id: number;
};

export const SubMenuOption: React.FC<Props> = ({ functionsOptions, mouseEnter, pathname, id }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  useQuery(['serviceRequest', id], () => serviceRequest(functionsOptions.funcaoId), {
    onSuccess: response => {
      if (response.data.permissao.can_Search) {
        navigate(functionsOptions.rotaFront, { state: response.data });
      } else {
        logout();
        toast.error('Você não tem permissão para acessar essa rota.');
      }
    },
    onError: error => {
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
      error;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: false,
    enabled: false,
  });

  const handleNavigate = (id: number) => {
    if (functionsOptions.funcaoId === id) {
      localStorage.setItem('function', functionsOptions.desc_Funcao);
      queryClient.fetchQuery(['serviceRequest', id]);
    }
  };

  return (
    <div className="flex items-center">
      <button className="cursor-pointer w-full" onClick={() => handleNavigate(id)}>
        <div
          className={`pl-[50px] pr-3 active:animate-click hover:border-l-2 hover:border-l-w-high hover:bg-[#0060CC] ${
            functionsOptions.rotaFront === pathname &&
            mouseEnter &&
            'bg-[#0060CC] border-l-w-high border-l-2'
          } flex items-center gap-3`}
        >
          {handleIcons(functionsOptions.icon_Funcao)}
          <Typography className="text-white py-1 text-start" fontSize={14}>
            {functionsOptions.desc_Funcao}
          </Typography>
        </div>
      </button>
    </div>
  );
};
