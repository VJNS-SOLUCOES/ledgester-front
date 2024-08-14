import React from 'react';
import { FunctionChildrenDto } from '../types';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { handleErros, handleIcons } from '../utils';
import { serviceRequest } from '../services';
import { useQuery, useQueryClient } from 'react-query';

type Props = {
  mouseEnter: boolean;
  pathname: string;
  functionsOptions: FunctionChildrenDto;
  id: number;
};

export const SubMenuOption: React.FC<Props> = ({ functionsOptions, mouseEnter, pathname, id }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useQuery(['serviceRequest', id], () => serviceRequest(functionsOptions.funcaoId), {
    onSuccess: response => {
      navigate(functionsOptions.rotaFront, { state: response.data });
    },
    onError: error => {
      handleErros(error);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
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
          className={`pl-7 pr-3 active:animate-click hover:bg-black/30 ${
            functionsOptions.rotaFront === pathname && mouseEnter && 'bg-black/30'
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
